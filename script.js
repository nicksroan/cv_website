// Smooth scrolling for navigation links with highlight-then-fade effect
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    
    // Remove existing highlight classes from all nav links and blur to prevent mobile hover state
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.classList.remove('highlight', 'fade-out');
      link.blur(); // Remove focus/hover state on mobile
    });
    
    // Add highlight class to clicked link
    this.classList.add('highlight');
    this.blur(); // Remove focus immediately to prevent hover state
    
    // Start fade after a brief highlight period
    setTimeout(() => {
      this.classList.remove('highlight');
      this.classList.add('fade-out');
      
      // Remove fade-out class after fade completes
      setTimeout(() => {
        this.classList.remove('fade-out');
      }, 1500);
    }, 300);
    
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      if (this.getAttribute("href") === "#home") {
        // Scroll to very top of page for home
        window.scrollTo({
          top: 0,
          behavior: "smooth"
        });
      } else {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }
  });
});

// Scroll-triggered fade-in animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      // Stop observing this element once it's been made visible
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll(".fade-in").forEach((el) => {
  observer.observe(el);
});

// Project data
const projectData = {
  project1: {
    title: "Academic Curriculum Development",
    content: `
                    <h3>Overview</h3>
                    <p>Led the comprehensive redesign of the audio engineering curriculum, integrating modern production techniques with traditional academic rigour.</p>
                    
                    <h3>Key Achievements</h3>
                    <p>• Increased student engagement by 40%<br>
                    • Implemented industry-standard software training<br>
                    • Developed partnerships with leading audio companies<br>
                    • Created hands-on project-based learning modules</p>
                    
                    <h3>Technologies Used</h3>
                    <p>Pro Tools, Logic Pro, Ableton Live, Curriculum Management Systems</p>
                `,
  },
  project2: {
    title: "Professional Audio Production",
    content: `
                    <h3>Overview</h3>
                    <p>Produced and engineered multiple commercial releases, working with artists across various genres whilst maintaining the highest audio quality standards.</p>
                    
                    <h3>Key Achievements</h3>
                    <p>• Produced 15+ commercial releases<br>
                    • Worked with Grammy-nominated artists<br>
                    • Implemented innovative recording techniques<br>
                    • Managed full production pipelines</p>
                    
                    <h3>Equipment & Software</h3>
                    <p>SSL Console, Pro Tools HDX, Neumann Microphones, Vintage Outboard Gear</p>
                `,
  },
  project3: {
    title: "Original Musical Compositions",
    content: `
                    <h3>Overview</h3>
                    <p>Composed original works spanning contemporary classical, electronic, and hybrid orchestral pieces for various media and performance contexts.</p>
                    
                    <h3>Key Achievements</h3>
                    <p>• 20+ original compositions completed<br>
                    • Featured in film and media projects<br>
                    • Performed by professional ensembles<br>
                    • Published through major music libraries</p>
                    
                    <h3>Compositional Tools</h3>
                    <p>Sibelius, Logic Pro, Kontakt Libraries, Hardware Synthesisers</p>
                `,
  },
};

// Track currently clicked project
let currentlyClickedProject = null;

// Function to show modal
function showModal(projectId, clickedElement) {
  const project = projectData[projectId];
  if (project) {
    // Store reference to clicked project
    currentlyClickedProject = clickedElement;

    // Add modal-active class to keep it zoomed
    clickedElement.classList.add("modal-active");

    // Remove any existing modal
    const existingModal = document.getElementById("dynamicModal");
    if (existingModal) {
      existingModal.remove();
    }

    // Create modal dynamically and append to body
    const modalHTML = `
                    <div id="dynamicModal" style="
                        display: block;
                        position: fixed;
                        z-index: 2147483647;
                        left: 0;
                        top: 0;
                        width: 100vw;
                        height: 100vh;
                        background-color: rgba(255, 255, 255, 0);
                        backdrop-filter: blur(0px);
                        transition: all 0.6s ease-out;
                        opacity: 0;
                    ">
                        <div style="
                            background: #FEFAF5;
                            padding: 3rem;
                            border-radius: 15px;
                            width: 80%;
                            max-width: 600px;
                            max-height: 70vh;
                            overflow-y: auto;
                            box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
                            position: fixed;
                            z-index: 2147483647;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%) scale(0.8);
                            transition: all 0.6s ease-out;
                            opacity: 0;
                        ">
                            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 2rem; border-bottom: 2px solid #7AA39A; padding-bottom: 1rem;">
                                <h2 style="font-family: 'Libre Baskerville', serif; font-size: 1.8rem; color: #636C6E; margin: 0;">${project.title}</h2>
                                <span onclick="hideModal()" style="color: #929292; font-size: 2rem; font-weight: bold; cursor: pointer; transition: color 0.3s ease; line-height: 1;">&times;</span>
                            </div>
                            <div style="font-family: 'EB Garamond', serif; font-size: 1.1rem; line-height: 1.8; color: #000000;">
                                ${project.content}
                            </div>
                        </div>
                    </div>
                `;

    // Append directly to body
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    // Disable background scrolling and prevent layout shift
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = scrollbarWidth + "px";

    // Trigger animation after a brief delay
    const modalElement = document.getElementById("dynamicModal");
    const modalContent = modalElement.querySelector("div");

    setTimeout(() => {
      modalElement.style.opacity = "1";
      modalElement.style.backgroundColor = "rgba(255, 255, 255, 0.1)";
      modalElement.style.backdropFilter = "blur(15px)";
      modalContent.style.opacity = "1";
      modalContent.style.transform = "translate(-50%, -50%) scale(1)";
    }, 10);

    // Add click outside to close
    document
      .getElementById("dynamicModal")
      .addEventListener("click", function (e) {
        if (e.target === this) {
          hideModal();
        }
      });
  }
}

// Function to hide modal
function hideModal() {
  const dynamicModal = document.getElementById("dynamicModal");
  if (dynamicModal) {
    const modalContent = dynamicModal.querySelector("div");

    // Animate out
    dynamicModal.style.opacity = "0";
    dynamicModal.style.backgroundColor = "rgba(255, 255, 255, 0)";
    dynamicModal.style.backdropFilter = "blur(0px)";
    modalContent.style.opacity = "0";
    modalContent.style.transform = "translate(-50%, -50%) scale(0.8)";

    // Remove after animation completes
    setTimeout(() => {
      dynamicModal.remove();
    }, 600);
  }

  // Remove modal-active class from clicked project after modal closes
  if (currentlyClickedProject) {
    // Use a timeout that matches the modal close animation
    setTimeout(() => {
      currentlyClickedProject.classList.remove("modal-active");
      currentlyClickedProject = null;
    }, 600);
  }

  // Re-enable background scrolling and remove padding compensation
  document.body.style.overflow = "auto";
  document.body.style.paddingRight = "";
}

// Add click event to project items
document.querySelectorAll(".project-item").forEach((item) => {
  item.addEventListener("click", () => {
    const projectId = item.getAttribute("data-project");
    showModal(projectId, item);
  });
});

// Close modal with Escape key
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    hideModal();
  }
});

// Sophisticated 3D tilt effect for profile image
const profileImage = document.querySelector(".profile-image");
let isHovering = false;

profileImage.addEventListener("mouseenter", () => {
  isHovering = true;
});

profileImage.addEventListener("mousemove", (e) => {
  if (!isHovering) return;

  const rect = profileImage.getBoundingClientRect();
  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * -6;
  const rotateY = ((x - centerX) / centerX) * 6;
  const scale = 1.02;

  profileImage.style.transition =
    "transform 0.2s ease, box-shadow 0.3s ease";
  profileImage.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`;
});

profileImage.addEventListener("mouseleave", () => {
  isHovering = false;
  profileImage.style.transition =
    "transform 0.5s ease, box-shadow 0.3s ease";
  profileImage.style.transform =
    "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";
});