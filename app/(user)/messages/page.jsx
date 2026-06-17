"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useMessages } from "@/hooks/useMessages";
import { useAuth } from "@/hooks/useAuth";

export default function MessagesPage() {
  const { messages, loading, error, fetchMessages, sendMessage } = useMessages();
  const { isAuthenticated, user, status } = useAuth();
  const [composing, setComposing] = useState(false);
  const [form, setForm] = useState({ subject: "", content: "" });
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");

  useEffect(() => {
    if (isAuthenticated) {
      fetchMessages();
    }
  }, [isAuthenticated, fetchMessages]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!form.content.trim()) {
      setSendError("Message content is required.");
      return;
    }
    setSending(true);
    setSendError("");
    const result = await sendMessage({
      receiverId: null,
      subject: form.subject,
      content: form.content,
    });
    setSending(false);
    if (result.success) {
      setForm({ subject: "", content: "" });
      setComposing(false);
    } else {
      setSendError(result.error || "Failed to send message.");
    }
  };

  if (status === "loading") {
    return (
      <div style={{ padding: "3rem", textAlign: "center", minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <p style={{ color: "var(--text-muted)" }}>Loading...</p>
      </div>
    );
  }

  if (!isAuthenticated) {
    return (
      <div style={{ padding: "3rem", textAlign: "center", minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1.5rem" }}>
        <h2 style={{ fontSize: "1.5rem" }}>Please login to view messages</h2>
        <Link href="/login" style={{ padding: "0.8rem 1.5rem", background: "var(--gold)", color: "var(--btn-on-gold)", fontWeight: "600", borderRadius: "4px" }}>
          Go to Login
        </Link>
      </div>
    );
  }

  const sorted = [...messages].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div style={{ padding: "3rem", maxWidth: "1000px", margin: "0 auto", minHeight: "60vh" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", flexWrap: "wrap", gap: "1rem", marginBottom: "2rem" }}>
        <div>
          <h1 style={{ fontSize: "2.5rem", fontWeight: "bold", marginBottom: "0.5rem" }}>MESSAGES</h1>
          <p style={{ color: "var(--text-muted)" }}>Communicate with sellers and support.</p>
        </div>
        <button
          onClick={() => setComposing((v) => !v)}
          style={{
            padding: "0.7rem 1.4rem",
            background: composing ? "var(--surface3)" : "var(--gold)",
            color: composing ? "var(--text)" : "var(--btn-on-gold)",
            fontWeight: "600",
            borderRadius: "4px",
            border: "none",
            cursor: "pointer",
          }}
        >
          {composing ? "Cancel" : "+ New Message"}
        </button>
      </div>
      <div style={{ height: "2px", background: "var(--gold)", width: "100px", marginBottom: "2rem" }} />

      {/* Compose */}
      {composing && (
        <form
          onSubmit={handleSend}
          style={{
            background: "var(--surface2)",
            border: "1px solid var(--border)",
            borderRadius: "var(--radius-sm)",
            padding: "1.5rem",
            marginBottom: "2rem",
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
          }}
        >
          <input
            type="text"
            placeholder="Subject (optional)"
            value={form.subject}
            onChange={(e) => setForm({ ...form, subject: e.target.value })}
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--input-border)",
              borderRadius: "4px",
              padding: "0.7rem 1rem",
              color: "var(--text)",
              fontSize: "0.95rem",
            }}
          />
          <textarea
            placeholder="Write your message..."
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            style={{
              background: "var(--input-bg)",
              border: "1px solid var(--input-border)",
              borderRadius: "4px",
              padding: "0.7rem 1rem",
              color: "var(--text)",
              fontSize: "0.95rem",
              resize: "vertical",
              fontFamily: "inherit",
            }}
          />
          {sendError && <p style={{ color: "var(--red-accent)", fontSize: "0.85rem" }}>{sendError}</p>}
          <button
            type="submit"
            disabled={sending}
            style={{
              alignSelf: "flex-end",
              padding: "0.65rem 1.5rem",
              background: "var(--gold)",
              color: "var(--btn-on-gold)",
              fontWeight: "600",
              borderRadius: "4px",
              border: "none",
              cursor: sending ? "not-allowed" : "pointer",
              opacity: sending ? 0.7 : 1,
            }}
          >
            {sending ? "Sending..." : "Send Message"}
          </button>
        </form>
      )}

      {loading && <p style={{ color: "var(--text-muted)" }}>Loading messages...</p>}
      {error && <p style={{ color: "var(--red-accent)" }}>{error}</p>}

      {!loading && messages.length === 0 && (
        <div style={{ textAlign: "center", padding: "4rem 2rem", background: "var(--surface2)", borderRadius: "var(--radius-md)", border: "1px solid var(--border-dim)" }}>
          <p style={{ color: "var(--text-muted)", marginBottom: "1rem", fontSize: "1.1rem" }}>No messages yet.</p>
          <p style={{ color: "var(--text-muted)", fontSize: "0.9rem" }}>Send a message to a seller from any car listing.</p>
        </div>
      )}

      {sorted.length > 0 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {sorted.map((msg) => {
            const isMine = msg.senderId === user?.id;
            return (
              <div
                key={msg.id}
                style={{
                  background: isMine ? "var(--surface2)" : "var(--surface3)",
                  border: "1px solid var(--border-dim)",
                  borderRadius: "var(--radius-sm)",
                  padding: "1.25rem 1.5rem",
                }}
              >
                <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", gap: "0.75rem", alignItems: "center" }}>
                    <span style={{
                      padding: "0.15rem 0.5rem",
                      borderRadius: "999px",
                      fontSize: "0.7rem",
                      fontWeight: "600",
                      background: isMine ? "rgba(201,168,76,0.15)" : "rgba(100,149,237,0.15)",
                      color: isMine ? "var(--gold)" : "#6495ED",
                    }}>
                      {isMine ? "Sent" : "Received"}
                    </span>
                    {msg.subject && (
                      <span style={{ fontWeight: "600", fontSize: "0.95rem" }}>{msg.subject}</span>
                    )}
                  </div>
                  <span style={{ fontSize: "0.8rem", color: "var(--text-muted)" }}>
                    {new Date(msg.createdAt).toLocaleString()}
                  </span>
                </div>
                {msg.car && (
                  <p style={{ fontSize: "0.8rem", color: "var(--text-muted)", marginBottom: "0.5rem" }}>
                    Re: {msg.car.brand} {msg.car.name}
                  </p>
                )}
                <p style={{ color: "var(--text)", lineHeight: "1.6", fontSize: "0.95rem" }}>{msg.content}</p>
                {!isMine && !msg.isRead && (
                  <span style={{ display: "inline-block", marginTop: "0.5rem", fontSize: "0.7rem", color: "var(--gold)" }}>● Unread</span>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
