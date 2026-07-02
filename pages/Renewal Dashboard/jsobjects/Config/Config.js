export default {
	// Single source of truth for the renewal API base URL.
	//
	// This URL is used by browser-side actions (navigateTo links for packet
	// preview/download), so it must be reachable from the USER'S BROWSER —
	// use the Tailscale host, never a docker-internal IP like 172.17.0.1.
	//
	// Note: the ContractRenewalAPI datasource has its own base URL configured
	// in the datasource settings (server-side, not stored in git). Keep it in
	// sync with this value.
	API_BASE_URL: "http://100.121.102.112:3127",

	packetUrl (runId) {
		return this.API_BASE_URL + "/api/renewals/runs/" + runId + "/packet";
	},

	downloadUrl (runId) {
		return this.API_BASE_URL + "/api/renewals/runs/" + runId + "/download";
	}
}
