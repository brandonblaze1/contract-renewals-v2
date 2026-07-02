export default {
        // Single source of truth for the renewal API base URL.
        // Used by browser-side navigateTo links, so it must be reachable
        // from the user's browser — Tailscale host, never 172.17.0.1.
        // Keep the ContractRenewalAPI datasource URL in sync (set separately
        // in datasource settings; not stored in git).
        API_BASE_URL: "http://100.121.102.112:3127",

        packetUrl (runId) {
                return this.API_BASE_URL + "/api/renewals/runs/" + runId + "/packet";
        },

        downloadUrl (runId) {
                return this.API_BASE_URL + "/api/renewals/runs/" + runId + "/download";
        }
  }