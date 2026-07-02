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
	}
}
