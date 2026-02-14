import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const token = process.env.GITHUB_TOKEN;
    const owner = process.env.GITHUB_OWNER || "dreamerskymaster";
    const repo = process.env.GITHUB_REPO || "vday2026";
    const path = "data/responses.json";

    if (!token) {
      return NextResponse.json({ error: "GITHUB_TOKEN not configured" }, { status: 500 });
    }

    // 1. Get the current file (if it exists) to get its SHA
    let sha: string | undefined;
    let currentContent: any[] = [];

    try {
      const getFileResponse = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/vnd.github.v3+json",
          },
        }
      );

      if (getFileResponse.ok) {
        const fileData = await getFileResponse.json();
        sha = fileData.sha;
        const decoded = Buffer.from(fileData.content, "base64").toString("utf-8");
        currentContent = JSON.parse(decoded);
      }
    } catch (e) {
      console.log("File likely doesn't exist yet, starting new.");
    }

    // 2. Append new response
    currentContent.push({
      ...data,
      server_timestamp: new Date().toISOString(),
    });

    const newContent = Buffer.from(JSON.stringify(currentContent, null, 2)).toString("base64");

    // 3. Push to GitHub
    const putResponse = await fetch(
      `https://api.github.com/repos/${owner}/${repo}/contents/${path}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/vnd.github.v3+json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: "Update responses from Deeksha 💛",
          content: newContent,
          sha: sha, // Required if updating existing file
        }),
      }
    );

    if (!putResponse.ok) {
      const errorData = await putResponse.json();
      return NextResponse.json({ error: "GitHub API error", details: errorData }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
