// داده‌های دانشجویان
const students = [
    {
        first: 'علی',
        last: 'احمدی',
        id: '9812345',
        units: 90,
        major: 'نرم‌افزار',
        img: 'https://picsum.photos/seed/9812345/250'
    },
    {
        first: 'سارا',
        last: 'موسوی',
        id: '9812346',
        units: 100,
        major: 'برق',
        img: 'https://picsum.photos/seed/9812346/250'
    },
    {
        first: 'محمد',
        last: 'کریمی',
        id: '9812347',
        units: 85,
        major: 'کامپیوتر',
        img: 'https://picsum.photos/seed/9812347/250'
    }
];

// داده‌های اسلایدها
const slides = [...Array(10).keys()].map(i => `https://picsum.photos/seed/${i+1}/400`);

// متغیرهای سراسری
let currentSlideIndex = 0;
let studentToDelete = null;

// تابع برای ایجاد اسلایدشو
function createSlideshow() {
    const slideshow = document.getElementById('slideshow');
    
    slides.forEach((slide, index) => {
        const slideElement = document.createElement('div');
        slideElement.className = `slide ${index === 0 ? 'active' : ''}`;
        slideElement.style.backgroundImage = `url(${slide})`;
        slideshow.appendChild(slideElement);
    });
    
    // اضافه کردن event listeners برای دکمه‌ها
    document.getElementById('prevBtn').addEventListener('click', showPrevSlide);
    document.getElementById('nextBtn').addEventListener('click', showNextSlide);
}

// تابع برای نمایش اسلاید قبلی
function showPrevSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = (currentSlideIndex - 1 + slides.length) % slides.length;
    slides[currentSlideIndex].classList.add('active');
}

// تابع برای نمایش اسلاید بعدی
function showNextSlide() {
    const slides = document.querySelectorAll('.slide');
    slides[currentSlideIndex].classList.remove('active');
    
    currentSlideIndex = (currentSlideIndex + 1) % slides.length;
    slides[currentSlideIndex].classList.add('active');
}

// تابع برای پر کردن جدول با داده‌های دانشجویان
function populateStudentsTable() {
    const tbody = document.querySelector('#studentsTable tbody');
    
    students.forEach(student => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${student.first}</td>
            <td>${student.last}</td>
            <td>${student.id}</td>
            <td>${student.units}</td>
            <td>${student.major}</td>
            <td>
                <button class="action-btn image-btn" data-id="${student.id}">نمایش عکس</button>
                <button class="action-btn delete-btn" data-id="${student.id}">حذف</button>
            </td>
        `;
        
        tbody.appendChild(row);
    });
    
    // اضافه کردن event listeners برای دکمه‌ها
    document.querySelectorAll('.image-btn').forEach(btn => {
        btn.addEventListener('click', showStudentImage);
    });
    
    document.querySelectorAll('.delete-btn').forEach(btn => {
        btn.addEventListener('click', confirmDeleteStudent);
    });
}

// تابع برای نمایش عکس دانشجو در مدال
function showStudentImage(event) {
    const studentId = event.target.getAttribute('data-id');
    const student = students.find(s => s.id === studentId);
    
    if (student) {
        document.getElementById('modalImage').src = student.img;
        document.getElementById('modalStudentName').textContent = 
            `${student.first} ${student.last}`;
        document.getElementById('imageModal').style.display = 'flex';
    }
}

// تابع برای تأیید حذف دانشجو
function confirmDeleteStudent(event) {
    const studentId = event.target.getAttribute('data-id');
    studentToDelete = studentId;
    document.getElementById('confirmationModal').style.display = 'flex';
}

// تابع برای حذف دانشجو
function deleteStudent() {
    if (studentToDelete) {
        const index = students.findIndex(s => s.id === studentToDelete);
        if (index !== -1) {
            students.splice(index, 1);
            // به روز رسانی جدول
            const tbody = document.querySelector('#studentsTable tbody');
            tbody.innerHTML = '';
            populateStudentsTable();
        }
        studentToDelete = null;
    }
    document.getElementById('confirmationModal').style.display = 'none';
}

// تابع برای لغو حذف
function cancelDelete() {
    studentToDelete = null;
    document.getElementById('confirmationModal').style.display = 'none';
}

// راه‌اندازی اولیه
document.addEventListener('DOMContentLoaded', function() {
    createSlideshow();
    populateStudentsTable();
    
    // اضافه کردن event listeners برای مدال‌ها
    document.getElementById('closeModal').addEventListener('click', function() {
        document.getElementById('imageModal').style.display = 'none';
    });
    
    document.getElementById('confirmDelete').addEventListener('click', deleteStudent);
    document.getElementById('cancelDelete').addEventListener('click', cancelDelete);
    
    // بستن مدال با کلیک خارج از آن
    window.addEventListener('click', function(event) {
        const imageModal = document.getElementById('imageModal');
        const confirmationModal = document.getElementById('confirmationModal');
        
        if (event.target === imageModal) {
            imageModal.style.display = 'none';
        }
        
        if (event.target === confirmationModal) {
            confirmationModal.style.display = 'none';
        }
    });
});