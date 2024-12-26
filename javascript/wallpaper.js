const imageWrapper = document.querySelector(".images");
const searchInput = document.querySelector(".search input");
const searchBtn = document.querySelector(".search-box i"); // Search button
const loadMoreBtn = document.querySelector(".gallery .load-more");
const lightbox = document.querySelector(".lightbox");
const downloadImgBtn = lightbox.querySelector(".uil-import");
const closeImgBtn = lightbox.querySelector(".close-icon");

// DOM dan elementlarni tanlab olish
const searchbarinp = document.querySelector(".search-bar input");
const searchbarbtn = document.querySelector(".search-bar i");

// Qidirish funksiyasi
const searchImages = () => {
    let query = searchbarinp.value.trim(); // Inputdan qidiruv so'zini olish
    if (!query) return; // Agar input bo'sh bo'lsa, hech narsa qilmaydi
    currentPage = 1; // Yangi qidiruv uchun sahifani qayta tiklash
    searchTerm = query; // Qidiruv so'zini o'zgaruvchiga o'zlashtirish
    imageWrapper.innerHTML = ""; // Ekrandagi rasm kartochkalarini tozalash
    getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
};

// Inputda Enter tugmasi bosilganda qidirish
searchbarinp.addEventListener("keyup", (e) => {
    if (e.key === "Enter") searchImages();
});

// Button bosilganda qidirish
searchbarbtn.addEventListener("click", searchImages);



// API key, paginations, searchTerm variables
const apiKey = "fdRzPnsEuVoxFaKBhEzchyQCYkhrd1MBwWiN341ssHN0myPnql6et1E7";
const perPage = 25;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (imgUrl) => {
    fetch(imgUrl).then(res => res.blob()).then(blob => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(blob);
        a.download = new Date().getTime();
        a.click();
    }).catch(() => alert("Failed to download image!"));
}

const showLightbox = (name, img) => {
    lightbox.querySelector("img").src = img;
    lightbox.querySelector("span").innerText = name;
    downloadImgBtn.setAttribute("data-img", img);
    lightbox.classList.add("show");
    document.body.style.overflow = "hidden";
}

const hideLightbox = () => {
    lightbox.classList.remove("show");
    document.body.style.overflow = "auto";
}

const generateHTML = (images) => {
    imageWrapper.innerHTML += images.map(img => {
        const grayBackground = '#5e6367'; // Och kulrang fon
        return `
            <li class="card fade-in" style="background-color: ${grayBackground};">
                <img onclick="showLightbox('${img.photographer}', '${img.src.large2x}')" src="${img.src.large2x}" alt="img">
                <div class="details">
                    <div class="photographer">
                        <i class="uil uil-camera"></i>
                        <span>${img.photographer}</span>
                    </div>
                    <button onclick="downloadImg('${img.src.large2x}');">
                        <i class="uil uil-import"></i>
                    </button>
                </div>
            </li>`;
    }).join("");
}




const getImages = (apiURL) => {
    searchInput.blur();
    loadMoreBtn.innerText = "Loading...";
    loadMoreBtn.classList.add("disabled");
    fetch(apiURL, {
        headers: { Authorization: apiKey }
    }).then(res => res.json()).then(data => {
        generateHTML(data.photos);
        loadMoreBtn.innerText = "Load More";
        loadMoreBtn.classList.remove("disabled");
    }).catch(() => alert("Failed to load images!"));
}

const loadImages = () => {
    if (searchInput.value === "") return searchTerm = null;
    currentPage = 1;
    searchTerm = searchInput.value;
    imageWrapper.innerHTML = "";
    getImages(`https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`);
}

const loadMoreImages = () => {
    currentPage++;
    let apiUrl = `https://api.pexels.com/v1/search?query=wallpaper&page=${currentPage}&per_page=${perPage}`;
    apiUrl = searchTerm ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}` : apiUrl;
    getImages(apiUrl);
}

getImages(`https://api.pexels.com/v1/search?query=wallpaper&page=${currentPage}&per_page=${perPage}`);

searchBtn.addEventListener("click", loadImages); // Search button click
searchInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") loadImages(); // Enter key press
});
loadMoreBtn.addEventListener("click", loadMoreImages);
closeImgBtn.addEventListener("click", hideLightbox);
downloadImgBtn.addEventListener("click", (e) => downloadImg(e.target.dataset.img));


const menuItems = document.querySelectorAll('.menu_li_1');

// Har bir menyu elementiga bosish uchun event qo'shish
menuItems.forEach(item => {
    item.addEventListener('click', () => {
        // Hozirgi aktiv elementdan 'active' klassini olib tashlash
        document.querySelector('.menu_li_1.active').classList.remove('active');
        // Bosilgan elementga 'active' klassini qo'shish
        item.classList.add('active');
    });
});






// API orqali rasmni olish
fetch('https://api.example.com/your-image-endpoint')
    .then(response => response.json())
    .then(data => {
        // APIdan olingan rasm URL sini img tagiga o'rnatish
        const image = document.getElementById("zoomImage");
        image.src = data.imageUrl; // APIdan olingan rasm URL sini 'imageUrl' deb faraz qilaylik
    })
    .catch(error => console.error('Error fetching image:', error));

// Zoom effekti uchun kod
const image = document.getElementById("zoomImage");

image.addEventListener("click", function(event) {
    const rect = image.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    
    // Set the transform origin to the point clicked
    image.style.transformOrigin = `${offsetX}px ${offsetY}px`;
    
    // Toggle zoom in/out effect
    if (image.style.transform === "scale(2)") {
        image.style.transform = "scale(1)";
    } else {
        image.style.transform = "scale(2)";
    }
});



// ACTIVE
// const textItems = document.querySelectorAll('.text-item');

// textItems.forEach(item => {
//     item.addEventListener('click', () => {
//         // Remove active class from all items
//         textItems.forEach(i => i.classList.remove('activete'));
//         // Add activete class to clicked item
//         item.classList.add('activete');
//     });
// });
// ACTIVE








