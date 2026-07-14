function showPage(pageId) {

    let pages = document.querySelectorAll(".page");

    pages.forEach(page => {
        page.style.display = "none";
    });

    document.getElementById(pageId).style.display = "block";
}


/* =========================
   NAVBAR TOGGLE
========================= */

let currentNav = "";

function toggleNavInfo(type) {

    let navInfo = document.getElementById("navInfo");

    let arrows = {
        hire: document.getElementById("hireArrow"),
        outcomes: document.getElementById("outcomesArrow"),
        findwork: document.getElementById("findworkArrow"),
        why: document.getElementById("whyArrow")
    };

    for (let key in arrows) {
        arrows[key].innerHTML = "▼";
    }

    if (currentNav == type) {
        navInfo.style.display = "none";
        currentNav = "";
        return;
    }

    currentNav = type;
    navInfo.style.display = "block";
    arrows[type].innerHTML = "▲";

    if (type == "hire") {
        navInfo.innerHTML = "Hire skilled professionals to grow your business.";
    }
    else if (type == "outcomes") {
        navInfo.innerHTML = "Achieve high-quality results through smart hiring.";
    }
    else if (type == "findwork") {
        navInfo.innerHTML = "Find jobs that match your skills and preferences.";
    }
    else if (type == "why") {
        navInfo.innerHTML = "HustleHub helps you build your online career.";
    }
}


/* =========================
   LOGIN SYSTEM
========================= */

function loginUser() {

    let username = document.getElementById("username").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    if (username == "" || email == "" || password == "") {
        alert("Please fill all fields.");
        return;
    }

    showPage("questionPage");
}


/* =========================
   GOOGLE LOGIN (REQUIRES EMAIL)
========================= */

function googleLogin() {

    let email = document.getElementById("email").value.trim();

    if (email === "") {
        alert("Please enter your Gmail first before continuing with Google.");
        return;
    }

    localStorage.setItem("user", JSON.stringify({
        username: "Google User",
        email: email,
        provider: "Google"
    }));

    alert("Google login successful!");
    showPage("questionPage");
}


/* =========================
   FACEBOOK LOGIN (REQUIRES EMAIL)
========================= */

function facebookLogin() {

    let email = document.getElementById("email").value.trim();

    if (email === "") {
        alert("Please enter your Facebook email first before continuing.");
        return;
    }

    localStorage.setItem("user", JSON.stringify({
        username: "Facebook User",
        email: email,
        provider: "Facebook"
    }));

    alert("Facebook login successful!");
    showPage("questionPage");
}

/* =========================
   AI JOB RECOMMENDER + DASHBOARD
========================= */

function showJobs() {

    let skill = document.getElementById("skill").value;
    let experience = document.getElementById("experience").value;
    let workType = document.getElementById("workType").value;

    if (skill == "" || experience == "" || workType == "") {
        alert("Please answer all questions.");
        return;
    }

    let jobsContainer = document.getElementById("jobsContainer");
    jobsContainer.innerHTML = "";

    let jobDatabase = {

        "Web Developer": [
            { title: "Frontend Developer", company: "TechNova", salary: "$3K–$5K", description: "Builds UI for websites." },
            { title: "Backend Developer", company: "CloudStack", salary: "$4K–$6K", description: "Handles servers & databases." },
            { title: "Full Stack Developer", company: "CodeBase", salary: "$6K–$9K", description: "Frontend + Backend development." },
            { title: "React Developer", company: "NextWave", salary: "$5K–$7K", description: "Builds React applications." },
            { title: "WordPress Developer", company: "WP Experts", salary: "$2.5K–$4.5K", description: "Creates WordPress sites." }
        ],

        "Graphic Designer": [
            { title: "UI Designer", company: "VisionArt", salary: "$3K–$5K", description: "Designs user interfaces." },
            { title: "Brand Designer", company: "Creative Hub", salary: "$2.5K–$4.5K", description: "Creates brand identity." },
            { title: "Illustrator", company: "SketchLab", salary: "$2K–$4K", description: "Creates digital illustrations." },
            { title: "Motion Designer", company: "Motionify", salary: "$3.5K–$6K", description: "Creates animations." },
            { title: "Social Media Designer", company: "SocialBoost", salary: "$1.8K–$3.5K", description: "Designs social content." }
        ],

        "Content Writer": [
            { title: "SEO Writer", company: "WriteFlow", salary: "$2K–$4K", description: "SEO optimized writing." },
            { title: "Copywriter", company: "MarketAds", salary: "$2.5K–$4.5K", description: "Marketing content writing." },
            { title: "Blog Writer", company: "BlogSphere", salary: "$1.5K–$3K", description: "Writes blogs." },
            { title: "Technical Writer", company: "TechDocs", salary: "$3K–$5K", description: "Technical documentation." }
        ],

        "Virtual Assistant": [
            { title: "Executive Assistant", company: "OfficeCore", salary: "$3K–$5K", description: "Admin support." },
            { title: "Customer Support VA", company: "HelpDesk", salary: "$2K–$4K", description: "Customer service." },
            { title: "E-commerce VA", company: "ShopAssist", salary: "$2.5K–$4.5K", description: "Online store management." }
        ]

    };

    let jobs = jobDatabase[skill] || [];

    /* =========================
       AI MATCH SCORE ENGINE
    ========================== */

    function getMatchScore(jobTitle) {

        let score = 60;

        if (experience == "Beginner") score += 10;
        if (experience == "Intermediate") score += 20;
        if (experience == "Advanced") score += 30;

        if (workType == "Remote") score += 15;
        if (workType == "Hybrid") score += 10;
        if (workType == "Onsite") score += 5;

        if (jobTitle.toLowerCase().includes(skill.split(" ")[0].toLowerCase())) {
            score += 10;
        }

        if (score > 98) score = 98;

        return score;
    }

    /* =========================
       DASHBOARD ANALYTICS
    ========================== */

    let totalJobs = jobs.length;
    let avgScore = 0;
    let topJob = "";
    let topScore = 0;

    jobs.forEach(job => {

        let score = getMatchScore(job.title);
        avgScore += score;

        if (score > topScore) {
            topScore = score;
            topJob = job.title;
        }

    });

    avgScore = (avgScore / jobs.length).toFixed(1);

    document.getElementById("dashboard").innerHTML = `
    <h2>📊 Career Dashboard</h2>

    <p><strong>Skill:</strong> ${skill}</p>
    <p><strong>Total Jobs:</strong> ${totalJobs}</p>
    <p><strong>Average Match:</strong> ${avgScore}%</p>
    <p><strong>Best Match Job:</strong> ${topJob} (${topScore}%)</p>

    <hr>

    <p><strong>Insight:</strong> You are best suited for <b>${topJob}</b> roles in a ${workType} setup based on your experience level.</p>
  `;

    /* =========================
       DISPLAY JOBS (5–10)
    ========================== */

    let recommendedJobs = jobs.slice(0, 10);

    recommendedJobs.forEach(job => {

        let score = getMatchScore(job.title);

        let card = document.createElement("div");
        card.classList.add("job-card");

        card.innerHTML = `
      <h3>${job.title}</h3>

      <p><strong>Company:</strong> ${job.company}</p>

      <p><strong>Description:</strong> ${job.description}</p>

      <p><strong>AI Match Score:</strong> ${score}%</p>

      <p><strong>Why Hiring:</strong> This role matches your ${experience} level and ${workType} preference.</p>

      <p><strong>Salary:</strong> ${job.salary}</p>

      <button onclick="applyJob('${job.title}')">Apply Now</button>
    `;

        jobsContainer.appendChild(card);
    });

    showPage("jobsPage");
}


/* =========================
   APPLY JOB
========================= */

function applyJob(jobTitle) {
    localStorage.setItem("selectedJob", jobTitle);
    showPage("applyPage");
}


/* =========================
   SUBMIT APPLICATION
========================= */

function submitApplication() {

    let fullName = document.getElementById("fullName").value;
    let email = document.getElementById("applicantEmail").value;

    if (fullName == "" || email == "") {
        alert("Please complete all required fields.");
        return;
    }

    let selectedJob = localStorage.getItem("selectedJob");

    document.getElementById("loadingPopup").style.display = "flex";

    setTimeout(() => {

        document.getElementById("loadingPopup").style.display = "none";

        document.getElementById("popupName").innerHTML = fullName;
        document.getElementById("popupJob").innerHTML = selectedJob;
        document.getElementById("popupEmail").innerHTML = email;

        document.getElementById("successPopup").style.display = "flex";

    }, 3000);
}


/* =========================
   POPUP CLOSE
========================= */

function closePopup() {
    document.getElementById("successPopup").style.display = "none";
    showPage("jobsPage");
}


/* =========================
   LOGOUT
========================= */

function logoutUser() {
    showPage("homePage");
}