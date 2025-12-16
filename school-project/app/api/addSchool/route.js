import mysql from "mysql2/promise";
import { NextResponse } from "next/server";
import fs from "node:fs/promises";
import path from "node:path";

export const runtime = "nodejs"; // ensure Node APIs available

export async function POST(request) {
  try {
    const formData = await request.formData();

    const name = formData.get("name");
    const address = formData.get("address");
    const city = formData.get("city");
    const state = formData.get("state");
    const contact = formData.get("contact");
    const email_id = formData.get("email_id");
    const file = formData.get("image"); // <input name="image" />

    let fileName = "";

    if (file && file.name) {
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // unique file name
      const ext = path.extname(file.name) || ".jpg";
      fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`;

      const filePath = path.join(process.cwd(), "public", "schoolImages", fileName);
      await fs.writeFile(filePath, buffer);
    }

    const connection = await mysql.createConnection({
      host: "localhost",
      user: "root",
      password: "#sudha@2402",
      database: "schoolProject",
    });

    const [result] = await connection.execute(
      "INSERT INTO schools (name, address, city, state, contact, image, email_id) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [name, address, city, state, contact, fileName, email_id]
    );

    await connection.end();

    return NextResponse.json(
      { success: true, id: result.insertId },
      { status: 200 }
    );
  } catch (err) {
    console.error("Upload/DB error:", err);
    return NextResponse.json(
      { success: false, error: err.message },
      { status: 500 }
    );
  }
}
