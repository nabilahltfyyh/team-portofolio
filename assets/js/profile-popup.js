const memberProfiles = [
  {
    cname: "NABILAH LUTHFIYYAH",
    name: "Frontend Developer",
    education: "Sistem Informasi · Universitas Hasanuddin",
    description:
      "Berfokus pada pengembangan antarmuka website yang responsif, interaktif, dan mudah digunakan.",
    skills: ["HTML", "CSS", "JavaScript"],
  },
  {
    cname: "NABILAH LUTHFIYYAH",
    name: "UI/UX Designer",
    education: "Sistem Informasi · Universitas Hasanuddin",
    description:
      "Berfokus pada desain antarmuka dan pengalaman pengguna untuk menghasilkan produk digital yang intuitif.",
    skills: ["Figma", "UI/UX", "Prototyping"],
  },
  {
    cname: "NABILAH LUTHFIYYAH",
    name: "Project Analyst",
    education: "Sistem Informasi · Universitas Hasanuddin",
    description:
      "Berfokus pada analisis kebutuhan, perencanaan, dan kolaborasi dalam pengembangan proyek digital.",
    skills: ["Analysis", "Planning", "Teamwork"],
  },
];

const members = document.querySelectorAll(".desc .member[data-member]");
const memberProfile = document.getElementById("memberProfile");

function showProfile(index) {
  const profile = memberProfiles[index];
  if (!profile) return;

  document.getElementById("profileNumber").textContent = profile.cname;

  document.getElementById("profileName").textContent = profile.name;
  document.getElementById("profileEducation").textContent = profile.education;
  document.getElementById("profileDescription").textContent = profile.description;

  const skills = document.getElementById("profileSkills");
  skills.replaceChildren();

  profile.skills.forEach((skill) => {
    const span = document.createElement("span");
    span.textContent = skill;
    skills.appendChild(span);
  });

  members.forEach((member, i) => {
    member.classList.toggle("is-active", i === index);
  });

  memberProfile.classList.add("is-visible");
}

function hideProfile() {
  memberProfile.classList.remove("is-visible");
  members.forEach((member) => member.classList.remove("is-active"));
}

members.forEach((member, index) => {
  member.addEventListener("mouseenter", () => showProfile(index));
  member.addEventListener("mouseleave", hideProfile);
  member.addEventListener("click", () => showProfile(index));
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") hideProfile();
});
