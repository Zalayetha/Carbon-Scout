import { createDockerSandboxTools, DockerSandboxClient } from "@anvia/sandbox";

const client = new DockerSandboxClient();
const image = "ghcr.io/astral-sh/uv:alpine";
await client.pullImage({
  image
});

export const sandbox = await client.createSandbox({
  image,
  workspace: {
    type: "ephemeral"
  },
  network: {
    mode: "bridge",
    ports: [8000]
  },
  files: {
    "input/research-brief.txt": "Investigate VCM benchmarks for Biochar and DAC (2024-2026) compliant with EU CBAM and GHG Protocol."
  },
  directories: ["output", "input"],
  resources: {
    memoryMb: 512,
    cpus: 1,
    pidsLimit: 64
  },
  runtime: {
    commandTimeoutMs: 20_000,
    maxOutputBytes: 64_000
  }
});

export const tools = createDockerSandboxTools({
  sandbox: sandbox.runtime,
  tools: [
    "read_file",
    "list_files",
    "write_file",
    "exec_command",
    "list_ports",
    "start_process",
    "stop_process",
    "read_process_logs",
    "list_processes",
    "wait_for_port"
  ]
});
