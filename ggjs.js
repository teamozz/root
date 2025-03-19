document.addEventListener("DOMContentLoaded", () => {
  const defaultThum = "https://cdn.jsdelivr.net/gh/teamozz/root@main/b61a2907aa8e1717333d4e7b270e915c.jpg";

  const videoContainer = document.querySelector(".vi-on");
  const changeButtons = document.querySelectorAll(".change-video");

  let activeButton = null;
  const preloadImage = (url) => {
    const img = new Image();
    img.src = url;
  };
  preloadImage(defaultThum);
  changeButtons.forEach((btn) => {
    const thumUrl = btn.getAttribute("data-thum");
    if (thumUrl) {
      preloadImage(thumUrl);
    }
  });
  const setEmbed = (url) => {
    videoContainer.innerHTML = `<iframe src="${url}" frameborder="0" allowfullscreen></iframe>`;
  };
  const initThumbnail = () => {
    const thumUrl = videoContainer.getAttribute("data-thum") || defaultThum;

    videoContainer.innerHTML = `
      <div class="play"><span></span></div>
      <img class="thumb-v" src="${thumUrl}" alt="Video Thumbnail" 
           onerror="this.remove();videoContainer.innerHTML+='<p>Thumbnails could not be loaded.</p>';">
    `;

    const playButton = videoContainer.querySelector(".play");
    if (playButton) {
      playButton.onclick = () => {
        if (activeButton) {
          setEmbed(activeButton.getAttribute("data-embed"));
        }
      };
    }
  };
  const initEmbedButtons = () => {
    changeButtons.forEach((btn) => {
      btn.onclick = () => {
        if (activeButton) {
          activeButton.classList.remove("bactive");
        }
        btn.classList.add("bactive");
        activeButton = btn;
        setEmbed(btn.getAttribute("data-embed"));
      };
    });
    if (changeButtons.length > 0) {
      changeButtons[0].classList.add("bactive");
      activeButton = changeButtons[0];
    }
  };

  initThumbnail();
  initEmbedButtons();
});
