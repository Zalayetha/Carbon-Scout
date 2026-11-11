import { createDockerSandboxTools, DockerSandboxClient, type DockerSandbox } from "@anvia/sandbox";

const image = "ghcr.io/astral-sh/uv:alpine";

let sandboxPromise: Promise<DockerSandbox> | null = null;
let toolsPromise: Promise<ReturnType<typeof createDockerSandboxTools>> | null = null;

async function initSandbox(): Promise<DockerSandbox> {
  const client = new DockerSandboxClient();
  await client.pullImage({
    image
  });

  return client.createSandbox({
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
}

/** Lazily pulls the image and creates the sandbox once; later calls reuse it. */
export function getSandbox(): Promise<DockerSandbox> {
  sandboxPromise ??= initSandbox().catch((error: unknown) => {
    // Allow a retry after a Docker failure instead of caching the rejection.
    sandboxPromise = null;
    throw error;
  });
  return sandboxPromise;
}

/** Lazily creates the sandbox tools bound to the shared sandbox runtime. */
export function getSandboxTools(): Promise<ReturnType<typeof createDockerSandboxTools>> {
  toolsPromise ??= getSandbox()
    .then((sandbox) =>
      createDockerSandboxTools({
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
      })
    )
    .catch((error: unknown) => {
      toolsPromise = null;
      throw error;
    });
  return toolsPromise;
}
