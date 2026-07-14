// ============================================
// DEWAYNE PORTFOLIO
// script.js
// ============================================

// Get all pages and navigation items
const pages = document.querySelectorAll(".page");
const navItems = document.querySelectorAll(".sidebar li");

// ===============================
// Navigation Function
// ===============================

function showSection(sectionId, element){

    // Hide every page
    pages.forEach(page=>{

        page.classList.remove("activePage");

    });

    // Remove active menu
    navItems.forEach(item=>{

        item.classList.remove("active");

    });

    // Show selected page
    const selected=document.getElementById(sectionId);

    selected.classList.add("activePage");

    // Highlight menu
    element.classList.add("active");

    // Smooth scroll to top
    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

}

// ===============================
// Dashboard loads first
// ===============================

window.onload=function(){

    document
    .getElementById("dashboard")
    .classList
    .add("activePage");

}

// ===============================
// Fade Animation
// ===============================

pages.forEach(page=>{

    page.style.opacity="0";

});

document.addEventListener("click",()=>{

    const active=document.querySelector(".activePage");

    if(active){

        active.style.opacity="0";

        setTimeout(()=>{

            active.style.opacity="1";

        },120);

    }

});

// ===============================
// Card Hover Animation
// ===============================

const cards=document.querySelectorAll(

".statCard,.skillCard,.certificateCard,.galleryCard,.contactCard,.timelineItem"

);

cards.forEach(card=>{

    card.addEventListener("mouseenter",()=>{

        card.style.transform="translateY(-10px)";

    });

    card.addEventListener("mouseleave",()=>{

        card.style.transform="translateY(0px)";

    });

});

// ===============================
// Project Image Hover
// ===============================

const projectImage=document.querySelector(".projectImage img");

if(projectImage){

projectImage.addEventListener("mouseenter",()=>{

projectImage.style.transform="scale(1.05)";

});

projectImage.addEventListener("mouseleave",()=>{

projectImage.style.transform="scale(1)";

});

}

// ===============================
// Welcome Message
// ===============================

console.log("Welcome to Dewayne's Portfolio Dashboard");