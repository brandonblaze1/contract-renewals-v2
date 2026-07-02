export default {
	// Handler bodies for the dashboard action buttons (ticket U2).
	// Promise-style only — the deprecated .run(callback) form is gone.
	// Widget onClicks stay one-liners: {{ Renewals.generateRun() }}.

	async previewGenerate () {
		try {
			await q_gen_preview.run();
			showAlert(
				"Preview complete: " + (q_gen_preview.data.count || 0) + " run(s) ready.",
				"success"
			);
		} catch (error) {
			showAlert("Generate preview failed: " + JSON.stringify(error), "error");
		}
	},

	async generateMonth () {
		try {
			await q_gen_month.run();
			const errors = q_gen_month.data.error_count || 0;
			showAlert(
				"Generated " + (q_gen_month.data.generated_count || 0) +
				" packet(s). Errors: " + errors,
				errors > 0 ? "warning" : "success"
			);
			await q_runs.run();
		} catch (error) {
			showAlert("Generate monthly packets failed: " + JSON.stringify(error), "error");
		}
	},

	async generateRun () {
		if (!tblRuns.selectedRow.id) {
			showAlert("Select a renewal run first.", "warning");
			return;
		}
		try {
			await q_gen_run.run();
			showAlert("Packet generated for " + tblRuns.selectedRow.owner_name, "success");
			await q_runs.run();
			await q_run.run();
		} catch (error) {
			showAlert("Generate packet failed: " + JSON.stringify(error), "error");
		}
	},

	// Ticket U3: handler for the review widgets. Create these in the GUI:
	//   inpReviewNotes   (Input, multiline)  — owner-facing review notes
	//   inpInternalNotes (Input, multiline)  — internal notes
	//   btnSaveReview    (Button)            — onClick: {{ Renewals.saveReview() }}
	// Guarded so this JS object works even before the widgets exist.
	async saveReview () {
		if (!tblRuns.selectedRow.id) {
			showAlert("Select a renewal run first.", "warning");
			return;
		}
		if (typeof inpReviewNotes === "undefined" || typeof inpInternalNotes === "undefined") {
			showAlert("Review widgets not created yet (inpReviewNotes / inpInternalNotes).", "warning");
			return;
		}
		try {
			await q_review_save.run({
				review_notes: inpReviewNotes.text || null,
				internal_notes: inpInternalNotes.text || null
			});
			showAlert("Review saved for run " + tblRuns.selectedRow.id, "success");
			await q_runs.run();
		} catch (error) {
			showAlert("Save review failed: " + JSON.stringify(error), "error");
		}
	}
}
