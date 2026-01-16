/* ===============================
   Wejdan's Weekend – Interactions
   =============================== */

const modalOverlay = document.getElementById("modalOverlay");
const modalTitle = document.getElementById("modalTitle");
const modalBody = document.getElementById("modalBody");
const modalActions = document.getElementById("modalActions");
const closeModalBtn = document.getElementById("closeModal");

const bgMusic = document.getElementById("bgMusic");
const musicStatus = document.getElementById("musicStatus");
// Safety: ensure modal is hidden on first load
modalOverlay.hidden = true;

let musicStarted = false;

/* ---------- Music (after user tap) ---------- */
async function tryStartMusic() {
  if (musicStarted) return;
  try {
    await bgMusic.play();
    musicStarted = true;
    if (musicStatus) musicStatus.textContent = "Music: playing 🎶";
  } catch (e) {
    if (musicStatus) musicStatus.textContent = "Music: tap again to start 🎶";
  }
}

/* ---------- Modal helpers ---------- */
function openModal(title, bodyHTML, actions = []) {
  modalTitle.textContent = title;
  modalBody.innerHTML = bodyHTML;
  modalActions.innerHTML = "";

  actions.forEach(a => {
    const btn = document.createElement("button");
    btn.className = `btn ${a.primary ? "primary" : ""}`.trim();
    btn.textContent = a.label;
    btn.onclick = a.onClick;
    modalActions.appendChild(btn);
  });

  modalOverlay.hidden = false;
  document.body.style.overflow = "hidden";
}

function closeModal() {
  modalOverlay.hidden = true;
  document.body.style.overflow = "";
}

closeModalBtn.addEventListener("click", closeModal);
modalOverlay.addEventListener("click", (e) => {
  if (e.target === modalOverlay) closeModal();
});

/* ---------- Tile logic ---------- */
function tile1() {
  openModal(
    "👑 A relaxing princess",
    `
      <p>
        Princess mode activated 💆‍♀️✨<br>
        It’s time for your massage — soft, calm, and well-deserved.
      </p>
      <p class="soft">
      </p>
    `,
    [{ label: "Awww 💗", primary: true, onClick: closeModal }]
  );
}

function tile2() {
  openModal(
    "🍰 Tummy comfort",
    `
      <p>
        It’s time for food, sweets, or coffee ☕🍩<br>
        Whatever your heart (and tummy) wants today.
      </p>
      <p class="soft">
      </p>
    `,
    [{ label: "Yum 😋", primary: true, onClick: closeModal }]
  );
}

function tile3() {
  openModal(
    "🌷 A flowery day!",
    `
      <p>Choose your flower surprise, baby 💗</p>
    `,
    [
      {
        label: "💐 Real flowers",
        primary: true,
        onClick: () => {
          openModal(
            "💐 Real flowers",
            `
              <p>
                Real flowers it is 💐🤍<br>
                Because you deserve the real thing, always.
              </p>
            `,
            [{ label: "Aww 🥹", primary: true, onClick: closeModal }]
          );
        }
      },
      {
        label: "🌸 Lego",
        onClick: () => {
          openModal(
            "🌸 Flower lego",
            `
              <p>
                A cute flower Lego 🌸💗<br>
              </p>
            `,
            [{ label: "So cute 💕", primary: true, onClick: closeModal }]
          );
        }
      }
    ]
  );
}

function tile4() {
  openModal(
    "👜 The mega surprise!",
    `
      <p>
        Let’s get you that bag you want, baby girl 😌👜
      </p>
      <p class="soft">
        You deserve beautiful things — always 💗✨
      </p>
    `,
    [{ label: "OMG 😭💖", primary: true, onClick: closeModal }]
  );
}

/* ---------- Bind tiles ---------- */
document.querySelectorAll(".tile").forEach(tile => {
  tile.addEventListener("click", () => {
    tryStartMusic();

    const id = tile.dataset.tile;
    if (id === "1") tile1();
    if (id === "2") tile2();
    if (id === "3") tile3();
    if (id === "4") tile4();
  });
});