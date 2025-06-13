// Объединяем всю инициализацию в одном месте
document.addEventListener('DOMContentLoaded', function() {
    // Инициализация обработчиков событий
    initializeEventHandlers();
    // Инициализация навигации
    initializeNavigation();
    // Проверка загрузки библиотеки
    checkQRCodeLibrary();
    // Создаем плавающие QR-коды
    createFloatingQRs();
});

function initializeEventHandlers() {
    // Обработчик Enter для поля ввода
    const urlInput = document.getElementById('url-input');
    if (urlInput) {
        urlInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                generateQR();
            }
        });
    }
}

function initializeNavigation() {
    // Плавный скролл для всех ссылок с хэшем
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                setTimeout(() => {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }, 100);
            }
        });
    });

    // Подсветка активного пункта меню при скролле
    const sections = document.querySelectorAll('section, #features, #about, #contact');
    const navLinks = document.querySelectorAll('nav a');

    function updateActiveLink() {
        const scrollPosition = window.scrollY + window.innerHeight / 3;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();
}

function checkQRCodeLibrary() {
    if (typeof QRCode === 'undefined') {
        const errorDiv = document.getElementById('error');
        if (errorDiv) {
            errorDiv.textContent = 'Ошибка загрузки библиотеки QR-кода. Пожалуйста, проверьте подключение к интернету.';
            errorDiv.style.display = 'block';
            errorDiv.classList.add('fade-in', 'slide-up');
        }
    }
}

// // Массив доступных рамок
// const qrFrames = [
//     { name: 'Электрическая', class: 'qr-frame-electric' },
//     { name: 'Неоновая', class: 'qr-frame-neon' },
//     { name: 'Кибер', class: 'qr-frame-cyber' },
//     { name: 'Градиентная', class: 'qr-frame-gradient' },
//     { name: 'Пиксельная', class: 'qr-frame-pixel' },
//     { name: 'Голографическая', class: 'qr-frame-holographic' },
//     { name: 'Ретро', class: 'qr-frame-retro' },
//     { name: 'Минималистичная', class: 'qr-frame-minimal' },
//     { name: 'Космическая', class: 'qr-frame-space' },
//     { name: 'Угловая', class: 'qr-frame-corners' },
//     { name: 'Металлическая', class: 'qr-frame-metal' },
//     { name: 'Органическая', class: 'qr-frame-organic' },
//     { name: 'Акварельная', class: 'qr-frame-watercolor' },
//     { name: 'С тенью', class: 'qr-frame-shadow' },
//     { name: 'С узором', class: 'qr-frame-pattern' },
//     { name: 'Глитч', class: 'qr-frame-glitch' },
//     { name: 'Волны', class: 'qr-frame-waves' },
//     { name: 'Радуга', class: 'qr-frame-rainbow' },
//     { name: 'Точки', class: 'qr-frame-dots' }
// ];

// // Создаем селектор рамок
// function createFrameSelector() {
//     const qrContainer = document.getElementById('qrcode');
//     const frameSelector = document.createElement('div');
//     frameSelector.className = 'frame-selector';
//     frameSelector.style.cssText = `
//         margin-top: 20px;
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
//         gap: 10px;
//         padding: 15px;
//         background: rgba(0, 24, 48, 0.3);
//         border-radius: 10px;
//         backdrop-filter: blur(10px);
//     `;

//     const title = document.createElement('h3');
//     title.textContent = 'Выберите рамку';
//     title.style.cssText = `
//         grid-column: 1 / -1;
//         text-align: center;
//         color: white;
//         margin-bottom: 15px;
//     `;
//     frameSelector.appendChild(title);

//     qrFrames.forEach(frame => {
//         const button = document.createElement('button');
//         button.textContent = frame.name;
//         button.className = 'frame-button';
//         button.style.cssText = `
//             padding: 10px;
//             border: 1px solid var(--electric-blue);
//             border-radius: 8px;
//             background: rgba(52, 152, 219, 0.2);
//             color: white;
//             cursor: pointer;
//             transition: all 0.3s ease;
//         `;
        
//         button.addEventListener('mouseover', () => {
//             button.style.background = 'rgba(52, 152, 219, 0.4)';
//             button.style.transform = 'translateY(-2px)';
//         });
        
//         button.addEventListener('mouseout', () => {
//             button.style.background = 'rgba(52, 152, 219, 0.2)';
//             button.style.transform = 'translateY(0)';
//         });

//         button.addEventListener('click', () => {
//             const qrImage = qrContainer.querySelector('img');
//             if (qrImage) {
//                 // Удаляем все предыдущие классы рамок
//                 qrFrames.forEach(f => qrImage.classList.remove(f.class));
//                 // Добавляем базовый класс рамки и выбранный стиль
//                 qrImage.classList.add('qr-frame', frame.class);
//             }
//         });

//         frameSelector.appendChild(button);
//     });

//     // Вставляем селектор после контейнера с QR-кодом
//     qrContainer.parentNode.insertBefore(frameSelector, qrContainer.nextSibling);
// }

// Вызываем функцию создания селектора после генерации QR-кода
const originalGenerateQR = window.generateQR;
window.generateQR = function() {
    originalGenerateQR();
    setTimeout(() => {
        const frameSelector = document.querySelector('.frame-selector');
        if (!frameSelector) {
            createFrameSelector();
        }
    }, 100);
};

function generateQR() {
    const text = document.getElementById('url-input').value;
    const qrcodeDiv = document.getElementById('qrcode');
    const downloadBtn = document.getElementById('download-btn');
    const errorDiv = document.getElementById('error');
    const loading = document.getElementById('loading');

    // Очищаем предыдущий QR-код и ошибки с анимацией
    if (qrcodeDiv && qrcodeDiv.innerHTML) {
        const oldQR = qrcodeDiv.querySelector('img');
        if (oldQR) {
            oldQR.classList.add('fade-out', 'scale-out');
            setTimeout(() => {
                qrcodeDiv.innerHTML = '';
            }, 500);
        }
    }
    
    if (errorDiv) errorDiv.style.display = 'none';
    if (downloadBtn) downloadBtn.style.display = 'none';
    
    if (!text) {
        if (errorDiv) {
            errorDiv.textContent = 'Пожалуйста, введите текст или URL';
            errorDiv.style.display = 'block';
            errorDiv.classList.add('fade-in', 'slide-up');
        }
        return;
    }

    if (loading) {
        loading.style.display = 'block';
        loading.classList.add('pulse');
    }

    try {
        // Создаем QR-код
        new QRCode(qrcodeDiv, {
            text: text,
            width: 300,
            height: 300,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H
        });

        // Показываем кнопку скачивания после небольшой задержки
        setTimeout(() => {
            if (loading) {
                loading.style.display = 'none';
                loading.classList.remove('pulse');
            }
            
            // Анимируем появление QR-кода и кнопки скачивания
            const qrImage = qrcodeDiv.querySelector('img');
            if (qrImage) {
                qrImage.style.opacity = '0';
                qrImage.style.transform = 'scale(0.8) translateY(20px)';
                qrImage.style.transition = 'all 0.5s ease';
                
                setTimeout(() => {
                    qrImage.style.opacity = '1';
                    qrImage.style.transform = 'scale(1) translateY(0)';
                    
                    // Показываем кнопку скачивания с анимацией
                    if (downloadBtn) {
                        downloadBtn.style.display = 'block';
                        downloadBtn.classList.add('fade-in', 'slide-up');
                    }
                }, 100);
            }
        }, 500);
    } catch (error) {
        if (loading) {
            loading.style.display = 'none';
            loading.classList.remove('pulse');
        }
        if (errorDiv) {
            errorDiv.textContent = 'Ошибка при генерации QR-кода: ' + error.message;
            errorDiv.style.display = 'block';
            errorDiv.classList.add('fade-in', 'slide-up');
        }
        console.error('QR Code Error:', error);
    }
}

function downloadQR() {
    const qrImage = document.querySelector('#qrcode img');
    if (!qrImage) {
        const errorDiv = document.getElementById('error');
        if (errorDiv) {
            errorDiv.textContent = 'QR-код не найден';
            errorDiv.style.display = 'block';
            errorDiv.classList.add('fade-in', 'slide-up');
        }
        return;
    }

    // Добавляем анимацию нажатия
    qrImage.classList.add('scale-out');
    
    setTimeout(() => {
        qrImage.classList.remove('scale-out');
        qrImage.classList.add('scale-in');
    }, 200);

    // Создаем временный canvas для обработки изображения
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    canvas.width = qrImage.width;
    canvas.height = qrImage.height;

    // Рисуем изображение на canvas
    ctx.drawImage(qrImage, 0, 0);

    try {
        // Создаем временную ссылку для скачивания
        const link = document.createElement('a');
        const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
        link.download = `qr_code_${timestamp}.png`;
        link.href = canvas.toDataURL('image/png');
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        const errorDiv = document.getElementById('error');
        if (errorDiv) {
            errorDiv.textContent = 'Ошибка при скачивании: ' + error.message;
            errorDiv.style.display = 'block';
            errorDiv.classList.add('fade-in', 'slide-up');
        }
        console.error('Download Error:', error);
    }
}

function createFloatingQRs() {
    const color = {
        bg: 'rgba(255, 255, 255, 0.2)',
        glow: 'rgba(255, 255, 255, 0.3)',
        pattern: 'rgba(255, 255, 255, 0.8)',
        border: 'rgba(255, 255, 255, 0.3)'
    };

    function getRandomSize() {
        return Math.floor(Math.random() * (120 - 40) + 40);
    }

    function getRandomFloat() {
        return Math.floor(Math.random() * (20 - 10) + 10);
    }

    function createQR() {
        const qr = document.createElement('div');
        qr.className = 'floating-qr';
        
        const size = getRandomSize();
        const floatTime = getRandomFloat();
        
        qr.style.setProperty('--size', `${size}px`);
        qr.style.setProperty('--bg-color', color.bg);
        qr.style.setProperty('--glow-color', color.glow);
        qr.style.setProperty('--pattern-color', color.pattern);
        qr.style.setProperty('--border-color', color.border);
        qr.style.setProperty('--float-time', `${floatTime}s`);
        
        qr.style.left = Math.random() * (window.innerWidth - size) + 'px';
        qr.style.top = Math.random() * (window.innerHeight - size) + 'px';
        
        document.querySelector('.animated-background').appendChild(qr);
        
        setTimeout(() => {
            qr.remove();
            createQR();
        }, floatTime * 1000);
    }

    // Создаем начальные QR-коды
    for(let i = 0; i < 5; i++) {
        createQR();
    }
}

// Запускаем создание плавающих QR-кодов при загрузке страницы
window.addEventListener('load', createFloatingQRs);

// Обработчик для QR-питомца
const qrPet = document.getElementById('qr-pet');
if (qrPet) {
    let clickCount = 0;
    let lastClickTime = 0;
    let moodTimeout;
    let sleepTimeout;
    let isAwake = true;
    let lastAnimation = '';

    const colors = [
        'rgba(255,220,100,0.5)',  // Золотой
        'rgba(100,220,255,0.5)',  // Голубой
        'rgba(255,100,255,0.5)',  // Розовый
        'rgba(100,255,150,0.5)',  // Зеленый
        'rgba(255,150,100,0.5)'   // Оранжевый
    ];

    const animations = ['jumping', 'spinning', 'bouncing', 'shaking'];
    const moods = ['happy', 'excited', 'sleeping'];

    function playAnimation(animation) {
        if (lastAnimation) {
            qrPet.classList.remove(lastAnimation);
        }
        qrPet.classList.add(animation);
        lastAnimation = animation;
        
        // Удаляем класс анимации после её завершения
        const durations = {
            'jumping': 1000,
            'spinning': 800,
            'bouncing': 500,
            'shaking': 500
        };
        
        setTimeout(() => {
            qrPet.classList.remove(animation);
            lastAnimation = '';
        }, durations[animation]);
    }

    function changeMood(mood) {
        qrPet.classList.remove('happy', 'excited', 'sleeping');
        if (mood) {
            qrPet.classList.add(mood);
            if (mood === 'excited') {
                playAnimation(animations[Math.floor(Math.random() * animations.length)]);
            }
        }
    }

    function startSleepCycle() {
        sleepTimeout = setInterval(() => {
            if (Math.random() < 0.3 && isAwake) {
                isAwake = false;
                changeMood('sleeping');
                qrPet.style.background = 'rgba(200,200,255,0.2)';
                
                setTimeout(() => {
                    if (!isAwake) { // Проверяем, всё ещё ли питомец спит
                        isAwake = true;
                        changeMood('excited');
                        playAnimation('bouncing');
                        qrPet.style.background = colors[clickCount % colors.length];
                        
                        setTimeout(() => {
                            changeMood();
                        }, 1000);
                    }
                }, Math.random() * 5000 + 5000);
            }
        }, 10000);
    }

    startSleepCycle();

    qrPet.addEventListener('click', function() {
        const currentTime = new Date().getTime();
        
        if (currentTime - lastClickTime > 500) {
            if (!isAwake) {
                isAwake = true;
                changeMood('excited');
                playAnimation('bouncing');
                setTimeout(() => changeMood(), 1000);
            } else {
                clickCount = (clickCount + 1) % colors.length;
                lastClickTime = currentTime;

                this.style.background = colors[clickCount];
                this.style.boxShadow = `0 0 30px ${colors[clickCount]}`;
                
                if (currentTime - lastClickTime < 1000) {
                    changeMood('excited');
                    playAnimation('spinning');
                } else {
                    changeMood('happy');
                    playAnimation('jumping');
                }

                clearTimeout(moodTimeout);
                moodTimeout = setTimeout(() => {
                    changeMood();
                    this.style.boxShadow = 'none';
                }, 1000);
            }
        }
    });

    let lastMouseMove = 0;
    let mouseIdleTimeout;
    
    document.addEventListener('mousemove', (e) => {
        if (!isAwake) return;

        const currentTime = new Date().getTime();
        if (currentTime - lastMouseMove > 100) {
            lastMouseMove = currentTime;
            
            const petRect = qrPet.getBoundingClientRect();
            const petCenterX = petRect.left + petRect.width / 2;
            const petCenterY = petRect.top + petRect.height / 2;
            
            const angle = Math.atan2(e.clientY - petCenterY, e.clientX - petCenterX);
            const eyes = qrPet.querySelector('.qr-pet-eyes');
            if (eyes) {
                eyes.style.transform = `translateX(-50%) rotate(${angle}rad)`;
            }

            // Сбрасываем таймер бездействия мыши
            clearTimeout(mouseIdleTimeout);
            mouseIdleTimeout = setTimeout(() => {
                if (eyes) {
                    eyes.style.transform = 'translateX(-50%) rotate(0rad)';
                }
            }, 2000);
        }
    });

    qrPet.addEventListener('mouseover', function() {
        if (!isAwake) return;
        this.style.transform = 'scale(1.1) rotate(5deg)';
        changeMood('excited');
        playAnimation('shaking');
    });

    qrPet.addEventListener('mouseout', function() {
        if (!isAwake) return;
        this.style.transform = 'scale(1) rotate(0deg)';
        changeMood();
    });
} 
