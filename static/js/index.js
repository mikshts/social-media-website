// Sidebar
const menuItems = document.querySelectorAll(".menu-item");
// Messages
const messageNotification = document.querySelector("#messages-notifications");
const messages = document.querySelector(".messages");
const message = messages.querySelectorAll(".message");
const messageSearch = document.querySelector("#message-search");

//Theme
const theme = document.querySelector("#theme");
const themeModal = document.querySelector(".customize-theme");
const fontSize = document.querySelectorAll(".choose-size span");
var root = document.querySelector(":root");
const colorPalette = document.querySelectorAll(".choose-color span");
const Bg1 = document.querySelector(".bg-1");
const Bg2 = document.querySelector(".bg-2");
const Bg3 = document.querySelector(".bg-3");

// ============== SIDEBAR ==============

// Remove active class from all menu items
const changeActiveItem = () => {
  menuItems.forEach((item) => {
    item.classList.remove("active");
  });
};

menuItems.forEach((item) => {
  item.addEventListener("click", () => {
    changeActiveItem();
    item.classList.add("active");
    if (item.id != "notifications") {
      document.querySelector(".notifications-popup").style.display = "none";
    } else {
      document.querySelector(".notifications-popup").style.display = "block";
      document.querySelector(
        "#notifications .notification-count"
      ).style.display = "none";
    }
  });
});

// ============== MESSAGES ==============

//Searches messages
const searchMessage = () => {
  const val = messageSearch.value.toLowerCase();
  message.forEach((user) => {
    let name = user.querySelector("h5").textContent.toLowerCase();
    if (name.indexOf(val) != -1) {
      user.style.display = "flex";
    } else {
      user.style.display = "none";
    }
  });
};

//Search for messages
messageSearch.addEventListener("keyup", searchMessage);

//Highlight messages card when messages menu item is clicked
// Toggle messages visibility + highlight effect
messageNotification.addEventListener("click", () => {
  // Toggle .hidden class
  messages.classList.toggle("hidden");

  // Only highlight if now visible
  if (!messages.classList.contains("hidden")) {
    messages.style.boxShadow = "0 0 1rem var(--color-primary)";
    messageNotification.querySelector(".notification-count").style.display = "none";

    setTimeout(() => {
      messages.style.boxShadow = "none";
    }, 2000);
  }
});

// ============== THEME / DISPLAY CUSTOMIZATION ==============

document.addEventListener("DOMContentLoaded", function () {
  const themeModal = document.querySelector(".customize-theme");
  const theme = document.getElementById("theme");
  const fontSize = document.querySelectorAll(".choose-size span");
  const colorPalette = document.querySelectorAll(".choose-color span");
  const root = document.querySelector(":root");
  const Bg1 = document.querySelector(".bg-1");
  const Bg2 = document.querySelector(".bg-2");
  const Bg3 = document.querySelector(".bg-3");

  const themeKey = "colorThemePreference"; // Key for storing color theme in localStorage

  // Opens Modal
  const openThemeModal = () => {
    themeModal.style.display = "grid";
  };

  // Closes Modal
  const closeThemeModal = (e) => {
    if (e.target.classList.contains("customize-theme")) {
      themeModal.style.display = "none";
    }
  };

  themeModal.addEventListener("click", closeThemeModal);
  theme.addEventListener("click", openThemeModal);

  // ============== FONT SIZE ==============

  // remove active class from spans or font size selectors
  const removeSizeSelectors = () => {
    fontSize.forEach((size) => {
      size.classList.remove("active");
    });
  };

  fontSize.forEach((size) => {
    size.addEventListener("click", () => {
      removeSizeSelectors();
      let fontSizeValue;
      size.classList.toggle("active");

      if (size.classList.contains("font-size-1")) {
        fontSizeValue = "10px";
        root.style.setProperty("--sticky-top-left", "5.4rem");
        root.style.setProperty("--sticky-top-right", "5.4rem");
      } else if (size.classList.contains("font-size-2")) {
        fontSizeValue = "13px";
        root.style.setProperty("--sticky-top-left", "6rem");
        root.style.setProperty("--sticky-top-right", "6rem");
      // In the fontSize.forEach((size) => { ... }) section
      } else if (size.classList.contains("font-size-3")) {
        fontSizeValue = "16px";
        // Change these values to keep sidebars sticky
        root.style.setProperty("--sticky-top-left", "5rem");
        root.style.setProperty("--sticky-top-right", "5rem");
      }
      // Removed the else if blocks for font-size-4 and font-size-5

      // change font size of the root html element
      document.querySelector("html").style.fontSize = fontSizeValue;
      localStorage.setItem("fontSize", fontSizeValue); // Save font size
    });

    // Apply saved font size on load
    const savedFontSize = localStorage.getItem("fontSize");
    if (savedFontSize) {
      document.querySelector("html").style.fontSize = savedFontSize;
      removeSizeSelectors();
      fontSize.forEach((size) => {
        if (
          (savedFontSize === "10px" &&
            size.classList.contains("font-size-1")) ||
          (savedFontSize === "13px" &&
            size.classList.contains("font-size-2")) ||
          (savedFontSize === "16px" &&
            size.classList.contains("font-size-3"))
          // Removed the conditions for "19px" and "22px"
        ) {
          size.classList.add("active");
        }
      });
    }
  });

  // Remove active class from colors
  const changeActiveColorClass = () => {
    colorPalette.forEach((colorPicker) => {
      colorPicker.classList.remove("active");
    });
  };

  // Function to set primary color and save to localStorage
  const setPrimaryColor = (hue) => {
    root.style.setProperty("--primary-color-hue", hue);
    localStorage.setItem(themeKey, hue); // Save the primary hue
  };

  // Change color primary
  colorPalette.forEach((color) => {
    color.addEventListener("click", () => {
      let primaryHue;
      changeActiveColorClass();

      if (color.classList.contains("color-1")) {
        primaryHue = 252;
      } else if (color.classList.contains("color-2")) {
        primaryHue = 52;
      } else if (color.classList.contains("color-3")) {
        primaryHue = 352;
      } else if (color.classList.contains("color-4")) {
        primaryHue = 152;
      } else if (color.classList.contains("color-5")) {
        primaryHue = 202;
      }

      color.classList.add("active");
      setPrimaryColor(primaryHue);
    });
  });

  // Apply saved color theme on load
  const savedTheme = localStorage.getItem(themeKey);
  if (savedTheme) {
    root.style.setProperty("--primary-color-hue", savedTheme);
    changeActiveColorClass();
    colorPalette.forEach((color) => {
      if (
        (savedTheme === "252" && color.classList.contains("color-1")) ||
        (savedTheme === "52" && color.classList.contains("color-2")) ||
        (savedTheme === "352" && color.classList.contains("color-3")) ||
        (savedTheme === "152" && color.classList.contains("color-4")) ||
        (savedTheme === "202" && color.classList.contains("color-5"))
      ) {
        color.classList.add("active");
      }
    });
  }

  //Theme Background Values
  let lightColorLightness;
  let whiteColorLightness;
  let darkColorLightness;

  // Function to set background and save to localStorage
  const setBackground = (dark, white, light, bgClass) => {
    darkColorLightness = dark;
    whiteColorLightness = white;
    lightColorLightness = light;
    localStorage.setItem("darkColorLightness", darkColorLightness);
    localStorage.setItem("whiteColorLightness", whiteColorLightness);
    localStorage.setItem("lightColorLightness", lightColorLightness);
    changeBG();

    // Update active class for background
    document
      .querySelectorAll(".choose-bg .active")
      .forEach((item) => item.classList.remove("active"));
    bgClass.classList.add("active");
  };

  // Changes background color
  const changeBG = () => {
    root.style.setProperty("--light-color-lightness", lightColorLightness);
    root.style.setProperty("--white-color-lightness", whiteColorLightness);
    root.style.setProperty("--dark-color-lightness", darkColorLightness);
  };

  Bg1.addEventListener("click", () => {
    setBackground("95%", "100%", "0%", Bg1);
    localStorage.removeItem("darkColorLightness");
    localStorage.removeItem("whiteColorLightness");
    localStorage.removeItem("lightColorLightness");
    // add active class
    Bg1.classList.add("active");
    // remove active class from the others
    Bg2.classList.remove("active");
    Bg3.classList.remove("active");
  });

  Bg2.addEventListener("click", () => {
    setBackground("95%", "20%", "15%", Bg2);
  });

  Bg3.addEventListener("click", () => {
    setBackground("95%", "10%", "0%", Bg3);
  });

  // Apply saved background on load
  const savedDarkLightness = localStorage.getItem("darkColorLightness");
  const savedWhiteLightness = localStorage.getItem("whiteColorLightness");
  const savedLightLightness = localStorage.getItem("lightColorLightness");

  if (savedDarkLightness && savedWhiteLightness && savedLightLightness) {
    darkColorLightness = savedDarkLightness;
    whiteColorLightness = savedWhiteLightness;
    lightColorLightness = savedLightLightness;
    changeBG();

    // Update active class for background
    document
      .querySelectorAll(".choose-bg .active")
      .forEach((item) => item.classList.remove("active"));
    if (
      savedDarkLightness === "95%" &&
      savedWhiteLightness === "20%" &&
      savedLightLightness === "15%"
    ) {
      Bg2.classList.add("active");
    } else if (
      savedDarkLightness === "95%" &&
      savedWhiteLightness === "10%" &&
      savedLightLightness === "0%"
    ) {
      Bg3.classList.add("active");
    } else {
      Bg1.classList.add("active"); // Default if none match
    }
  } else {
    Bg1.classList.add("active"); // Set default background active
  }
});

// Show the popup after a delay (e.g., 5 seconds)
window.addEventListener("load", () => {
  setTimeout(() => {
      document.getElementById("popup").style.display = "flex";
  }, 5000); // 5000 ms = 5 seconds
});

// Close the popup
document.getElementById("close-popup").addEventListener("click", () => {
  document.getElementById("popup").style.display = "none";
});

// Handle subscription button click
document.getElementById("subscribe-button").addEventListener("click", () => {
  const selectedPlan = document.querySelector('input[name="subscription_plan"]:checked').value;
  console.log("Subscribed to:", selectedPlan); // You would typically send this to a server

  // For this example, just show a confirmation message
  document.getElementById("subscription-options").style.display = "none";
  document.getElementById("subscribe-button").style.display = "none";
  document.getElementById("subscription-confirmation").style.display = "block";

  // Optionally, you could close the popup after a short delay
  // setTimeout(() => {
  //     document.getElementById("popup").style.display = "none";
  // }, 2000);
});
