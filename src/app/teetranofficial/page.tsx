import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Tee Tran — Saigon Bonbon",
  description:
    "Founder & CEO of Saigon Bonbon, a modern Vietnamese American candy brand celebrating identity through flavor and expression.",
};

const contactHtml = `
<h1 style="text-align: center; font-size: 3rem; font-weight: 700; margin-bottom: 0.5rem;">Let's Connect!</h1>

<div style="max-width: 480px; margin: 0 auto; padding: 2rem 1rem; font-family: inherit; text-align: center;">
<img src="https://cdn.shopify.com/s/files/1/0802/7720/9343/files/tee.jpg?v=1773481637" alt="Tee Tran" style="width: 120px; height: 120px; border-radius: 50%; object-fit: cover; object-position: center top; margin-bottom: 1.25rem; display: block; margin-left: auto; margin-right: auto;">
<p style="font-size: 1.5rem; font-weight: 600; margin: 0 0 0.25rem;">Tee Tran</p>
<p style="margin: 0 0 1.25rem; opacity: 0.6; font-size: 0.95rem;">Founder &amp; CEO, Saigon Bonbon Inc.</p>
<p style="margin: 0 0 2rem; font-size: 1rem; line-height: 1.7;">I founded Saigon Bonbon, a modern Vietnamese American candy brand celebrating identity through flavor and expression. Let's talk!</p>
<a style="display: inline-block; padding: 0.75rem 2rem; background: #000; color: #fff; text-decoration: none; border-radius: 4px; font-size: 0.95rem; margin-bottom: 2.5rem;" href="https://cdn.shopify.com/s/files/1/0802/7720/9343/files/Tee_Tran_-_Saigon_Bonbon.vcf?v=1773479585" id="vcf-download"> Save Contact </a>
<p style="margin: 0 0 0.75rem; font-size: 0.85rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.08em;">Follow along</p>
<div style="display: flex; justify-content: center; gap: 1rem; flex-wrap: wrap;">
<a style="text-decoration: none; color: inherit; font-size: 0.95rem; opacity: 0.75;" href="https://linkedin.com/in/teetranofficial">LinkedIn</a>
<a style="text-decoration: none; color: inherit; font-size: 0.95rem; opacity: 0.75;" href="https://instagram.com/teetranofficial">Instagram</a>
<a style="text-decoration: none; color: inherit; font-size: 0.95rem; opacity: 0.75;" href="https://tiktok.com/@teetranofficial">TikTok</a>
<a style="text-decoration: none; color: inherit; font-size: 0.95rem; opacity: 0.75;" href="https://youtube.com/@teetranofficial">YouTube</a>
</div>
</div>
`;

export default function TeeTranContactPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "3rem 1rem",
        background: "#fff",
        color: "#111",
      }}
    >
      <div dangerouslySetInnerHTML={{ __html: contactHtml }} />
    </main>
  );
}
