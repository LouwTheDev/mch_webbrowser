// careers.js

const modal = document.getElementById("apply-modal");
const form = document.getElementById("application-form");
const roleTitle = document.getElementById("role-title");
const roleInput = document.getElementById("role-input");

// Open modal and set role title
function openApplication(role) {
  roleTitle.textContent = role;
  roleInput.value = role;
  modal.classList.remove("hidden");
}

// Close modal
function closeApplication() {
  modal.classList.add("hidden");
}

// Handle form submission
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const formData = new FormData(form);
  const role = formData.get("role");
  const username = formData.get("username");
  const discord_id = formData.get("discord_id");
  const age = formData.get("age");
  const why = formData.get("why");
  const experience = formData.get("experience");

  const embed = {
    title: "📨 New Staff Application",
    color: 0xff0000,
    fields: [
      { name: "Role", value: role },
      { name: "Discord Username", value: username },
      { name: "Discord ID", value: discord_id },
      { name: "Age", value: age },
      { name: "Why do you want this role?", value: why },
      { name: "Experience", value: experience }
    ],
    timestamp: new Date().toISOString()
  };

  try {
    await fetch("https://discord.com/api/webhooks/1359922639401128047/1ikvEhAZ7O5I3GtPym70RMwZ8YSp6XrdgZcxdwYfaItdMszQlXmGKNMhCEYHh4C_4ku5", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ embeds: [embed] })
    });

    alert("✅ Your application has been submitted!");
    form.reset();
    closeApplication();
  } catch (error) {
    console.error("❌ Failed to send application:", error);
    alert("❌ There was an error submitting your application. Please try again.");
  }
});
