<template>
  <v-card raised>
    <v-toolbar dark color="blue"> JavaScript REPL </v-toolbar>
    <div ref="terminal"></div>
  </v-card>
</template>
<script>
import { Terminal } from "xterm";
import { FitAddon } from "xterm-addon-fit";
import eio from "engine.io-client";
import { getCurrentBaseUrl } from "../../../../../packages/client/src";

export default {
  props: ["deviceId"],
  socket: null,
  mounted() {
    const term = new Terminal({
      theme: this.$vuetify.theme.dark
        ? undefined
        : {
            foreground: "black",
            background: "white",
            cursor: "black",
          },
      convertEol: true,
    });
    const fitAddon = new FitAddon();
    term.loadAddon(fitAddon);
    term.open(this.$refs.terminal);
    fitAddon.fit();

    const baseUrl = getCurrentBaseUrl();
    const eioPath = `endpoint/@scrypted/core/engine.io/repl/${this.deviceId}`;
    const eioEndpoint = baseUrl ? new URL(eioPath, baseUrl).pathname : '/' + eioPath;

    const options = {
      path: eioEndpoint,
    };
    const rootLocation = `${window.location.protocol}//${window.location.host}`;
    this.socket = eio(rootLocation, options);

    this.socket.on("message", (data) => {
      term.write(new Uint8Array(data));
    });

    term.onData((data) => {
      this.socket.send(data);
    });

    term.onBinary((data) => {
      this.socket.send(data);
    });
  },
  destroyed() {
    this.socket?.close();
  },
};
</script>