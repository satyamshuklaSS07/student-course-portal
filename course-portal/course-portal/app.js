/* ===== Storage layer (LocalStorage) ===== */
const STORAGE_KEY = "learnhub_enrollments";

function loadEnrollments() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}
function saveEnrollments(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

let enrollments = loadEnrollments(); // { courseId: { enrolledAt, completed: [lessonIndex,...] } }
const filters = { search: "", category: "All", level: "All" };

/* ===== Helpers ===== */
const app = document.getElementById("app");
const getCourse = (id) => COURSES.find((c) => c.id === Number(id));
const isEnrolled = (id) => Boolean(enrollments[id]);

function progressOf(course) {
  const e = enrollments[course.id];
  if (!e) return 0;
  return Math.round((e.completed.length / course.lessons.length) * 100);
}

function showToast(msg) {
  const t = document.getElementById("toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => t.classList.remove("show"), 2000);
}

function escapeHTML(str) {
  return String(str).replace(/[&<>"']/g, (m) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[m]));
}

/* ===== Reusable UI components ===== */
function progressBar(percent) {
  return `
    <div class="progress-label"><span>Progress</span><span>${percent}%</span></div>
    <div class="progress" role="progressbar" aria-valuenow="${percent}" aria-valuemin="0" aria-valuemax="100">
      <span style="width:${percent}%"></span>
    </div>`;
}

function courseCard(course, opts = {}) {
  const enrolled = isEnrolled(course.id);
  const percent = progressOf(course);
  return `
    <article class="card">
      <div class="card-icon">${course.icon}</div>
      <h3>${escapeHTML(course.title)}</h3>
      <div class="meta">
        <span class="tag">${escapeHTML(course.category)}</span>
        <span class="tag level">${course.level}</span>
        <span>⏱ ${course.duration}</span>
      </div>
      <p class="desc">${escapeHTML(course.description)}</p>
      ${enrolled ? progressBar(percent) : `<div class="meta">👤 ${escapeHTML(course.instructor)}</div>`}
      <div class="card-actions">
        <a class="btn outline grow" href="#/course/${course.id}">${opts.continueLabel && enrolled ? "Continue" : "View Details"}</a>
        ${enrolled
          ? ""
          : `<button class="btn accent grow" data-enroll="${course.id}">Enroll</button>`}
      </div>
    </article>`;
}

/* ===== Views ===== */
function renderCourseList() {
  const categories = ["All", ...new Set(COURSES.map((c) => c.category))];
  const levels = ["All", "Beginner", "Intermediate", "Advanced"];

  app.innerHTML = `
    <section class="hero">
      <h1>Explore Courses</h1>
      <p>Browse, search and enroll in courses to start learning today.</p>
    </section>
    <div class="controls">
      <input type="search" id="search" placeholder="Search courses, instructors..." value="${escapeHTML(filters.search)}" aria-label="Search courses" />
      <select id="level" aria-label="Filter by level">
        ${levels.map((l) => `<option ${l === filters.level ? "selected" : ""}>${l}</option>`).join("")}
      </select>
    </div>
    <div class="chips" id="chips">
      ${categories.map((c) => `<button class="chip ${c === filters.category ? "active" : ""}" data-cat="${escapeHTML(c)}">${escapeHTML(c)}</button>`).join("")}
    </div>
    <p class="result-info" id="result-info"></p>
    <div class="grid" id="course-grid"></div>`;

  document.getElementById("search").addEventListener("input", (e) => {
    filters.search = e.target.value;
    updateCourseGrid();
  });
  document.getElementById("level").addEventListener("change", (e) => {
    filters.level = e.target.value;
    updateCourseGrid();
  });
  document.getElementById("chips").addEventListener("click", (e) => {
    const btn = e.target.closest("[data-cat]");
    if (!btn) return;
    filters.category = btn.dataset.cat;
    document.querySelectorAll(".chip").forEach((c) => c.classList.toggle("active", c === btn));
    updateCourseGrid();
  });
  updateCourseGrid();
}

function getFilteredCourses() {
  const q = filters.search.trim().toLowerCase();
  return COURSES.filter((c) => {
    const matchSearch = !q || [c.title, c.instructor, c.category, c.description].some((f) => f.toLowerCase().includes(q));
    const matchCat = filters.category === "All" || c.category === filters.category;
    const matchLevel = filters.level === "All" || c.level === filters.level;
    return matchSearch && matchCat && matchLevel;
  });
}

function updateCourseGrid() {
  const list = getFilteredCourses();
  document.getElementById("result-info").textContent = `${list.length} course${list.length !== 1 ? "s" : ""} found`;
  document.getElementById("course-grid").innerHTML = list.length
    ? list.map((c) => courseCard(c)).join("")
    : `<div class="empty" style="grid-column:1/-1">No courses match your search. Try different keywords.</div>`;
}

function renderCourseDetail(id) {
  const course = getCourse(id);
  if (!course) {
    app.innerHTML = `<div class="empty">Course not found.<br><a class="btn" href="#/">Back to courses</a></div>`;
    return;
  }
  const enrolled = isEnrolled(course.id);
  const percent = progressOf(course);
  const completed = enrolled ? enrollments[course.id].completed : [];

  app.innerHTML = `
    <a class="back" href="#/">← Back to courses</a>
    <section class="detail">
      <div class="detail-head">
        <div class="card-icon">${course.icon}</div>
        <div>
          <h1>${escapeHTML(course.title)}</h1>
          <div class="meta">
            <span class="tag">${escapeHTML(course.category)}</span>
            <span class="tag level">${course.level}</span>
            <span>⏱ ${course.duration}</span>
            <span>👤 ${escapeHTML(course.instructor)}</span>
          </div>
        </div>
      </div>
      <p>${escapeHTML(course.description)}</p>

      ${enrolled ? `<div style="margin-top:16px">${progressBar(percent)}</div>` : ""}

      <h2>Course Lessons (${course.lessons.length})</h2>
      <ul class="lesson-list">
        ${course.lessons.map((l, i) => `
          <li class="lesson ${completed.includes(i) ? "done" : ""} ${enrolled ? "" : "locked"}">
            <input type="checkbox" id="lesson-${i}" data-lesson="${i}" ${completed.includes(i) ? "checked" : ""} ${enrolled ? "" : "disabled"} />
            <label for="lesson-${i}">${i + 1}. ${escapeHTML(l)}</label>
            ${completed.includes(i) ? "✅" : ""}
          </li>`).join("")}
      </ul>

      <div class="card-actions" style="margin-top:20px">
        ${enrolled
          ? `<button class="btn danger" data-unenroll="${course.id}">Unenroll</button>
             <a class="btn outline" href="#/dashboard">Go to Dashboard</a>`
          : `<button class="btn accent" data-enroll="${course.id}">Enroll in this course</button>`}
      </div>
      ${enrolled ? "" : `<p class="result-info" style="margin-top:10px">Enroll to unlock lessons and track your progress.</p>`}
    </section>`;

  app.querySelectorAll("[data-lesson]").forEach((cb) =>
    cb.addEventListener("change", () => toggleLesson(course.id, Number(cb.dataset.lesson)))
  );
}

function renderDashboard() {
  const mine = COURSES.filter((c) => isEnrolled(c.id));
  const completedCourses = mine.filter((c) => progressOf(c) === 100);
  const inProgress = mine.filter((c) => progressOf(c) < 100);
  const totalLessons = mine.reduce((s, c) => s + enrollments[c.id].completed.length, 0);
  const avg = mine.length ? Math.round(mine.reduce((s, c) => s + progressOf(c), 0) / mine.length) : 0;

  app.innerHTML = `
    <section class="hero">
      <h1>My Dashboard</h1>
      <p>Track your enrolled courses and learning progress.</p>
    </section>
    <div class="stats">
      <div class="stat"><strong>${mine.length}</strong><span>Enrolled</span></div>
      <div class="stat"><strong>${inProgress.length}</strong><span>In Progress</span></div>
      <div class="stat"><strong>${completedCourses.length}</strong><span>Completed</span></div>
      <div class="stat"><strong>${totalLessons}</strong><span>Lessons Done</span></div>
      <div class="stat"><strong>${avg}%</strong><span>Avg. Progress</span></div>
    </div>
    ${mine.length === 0
      ? `<div class="empty">You haven't enrolled in any course yet.<br><a class="btn accent" href="#/">Browse Courses</a></div>`
      : `
        ${inProgress.length ? `<h2 class="section">In Progress</h2><div class="grid">${inProgress.map((c) => courseCard(c, { continueLabel: true })).join("")}</div>` : ""}
        ${completedCourses.length ? `<h2 class="section" style="margin-top:28px">Completed 🎉</h2><div class="grid">${completedCourses.map((c) => courseCard(c, { continueLabel: true })).join("")}</div>` : ""}`}
  `;
}

/* ===== Actions ===== */
function enroll(id) {
  if (isEnrolled(id)) return;
  enrollments[id] = { enrolledAt: new Date().toISOString(), completed: [] };
  saveEnrollments(enrollments);
  showToast("Enrolled successfully! 🎉");
  updateNav();
  router();
}

function unenroll(id) {
  if (!confirm("Are you sure you want to unenroll? Your progress will be lost.")) return;
  delete enrollments[id];
  saveEnrollments(enrollments);
  showToast("You have been unenrolled.");
  updateNav();
  router();
}

function toggleLesson(courseId, index) {
  const e = enrollments[courseId];
  if (!e) return;
  const pos = e.completed.indexOf(index);
  if (pos === -1) e.completed.push(index);
  else e.completed.splice(pos, 1);
  saveEnrollments(enrollments);
  const course = getCourse(courseId);
  if (progressOf(course) === 100) showToast("Course completed! 🏆");
  renderCourseDetail(courseId);
}

/* ===== Global click handling (enroll / unenroll buttons) ===== */
document.addEventListener("click", (e) => {
  const en = e.target.closest("[data-enroll]");
  if (en) return enroll(Number(en.dataset.enroll));
  const un = e.target.closest("[data-unenroll]");
  if (un) return unenroll(Number(un.dataset.unenroll));
});

/* ===== Router ===== */
function updateNav() {
  document.getElementById("enroll-count").textContent = Object.keys(enrollments).length;
  const hash = location.hash || "#/";
  document.getElementById("nav-dashboard").classList.toggle("active", hash.startsWith("#/dashboard"));
  document.getElementById("nav-courses").classList.toggle("active", hash === "#/" || hash.startsWith("#/course"));
}

function router() {
  const hash = location.hash || "#/";
  if (hash.startsWith("#/course/")) renderCourseDetail(hash.split("/")[2]);
  else if (hash.startsWith("#/dashboard")) renderDashboard();
  else renderCourseList();
  updateNav();
}

window.addEventListener("hashchange", () => {
  router();
  window.scrollTo(0, 0);
});
router();
