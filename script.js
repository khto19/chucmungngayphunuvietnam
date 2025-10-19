// --- ANTI-VIEW SOURCE CODE ---
// This script makes it harder for casual users to view the source code.
// It's not a foolproof security measure but acts as a deterrent.

// 1. Disable Right-Click Context Menu
document.addEventListener('contextmenu', event => event.preventDefault());

// 2. Disable Common Keyboard Shortcuts for viewing source/developer tools
document.addEventListener('keydown', event => {
    // Prevent F12 (Dev Tools)
    if (event.key === 'F12') {
        event.preventDefault();
    }
    
    // Prevent Ctrl+Shift+I, Ctrl+Shift+J, Ctrl+Shift+C (Dev Tools)
    if (event.ctrlKey && event.shiftKey && ['I', 'J', 'C'].includes(event.key.toUpperCase())) {
        event.preventDefault();
    }
    
    // Prevent Ctrl+U (View Source)
    if (event.ctrlKey && event.key.toUpperCase() === 'U') {
        event.preventDefault();
    }
});


// --- ORIGINAL SCRIPT STARTS HERE ---
document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const welcomeScreen = document.getElementById('welcome-screen');
    const wishesScreen = document.getElementById('wishes-screen');
    const nameForm = document.getElementById('name-form');
    const nameInput = document.getElementById('name-input');
    const wishContentContainer = document.getElementById('wish-content-container');
    const wishTextEl = document.getElementById('wish-text');
    const signatureLine = document.getElementById('signature-line');
    const greetingLine = document.getElementById('greeting-line');
    const newWishBtn = document.getElementById('new-wish-btn');
    const canvas = document.getElementById('fireworks-canvas');
    const envelope = document.querySelector('.envelope');
    const musicToggle = document.getElementById('music-toggle');
    const musicDisc = document.getElementById('music-disc');
    const songItems = document.querySelectorAll('.song-item');
    const musicTooltip = document.getElementById('music-tooltip');
    const bouquetContainer = document.getElementById('bouquet-container');

    // --- State ---
    let currentName = '';
    let animationFrameId;
    let musicPlaying = false;
    let typeIntervalId = null;
    let fireworkLaunchIntervalId = null;
    const particles = [];
    
    // --- Music Setup ---
    let backgroundMusic = new Audio();
    backgroundMusic.loop = true;

    const longWishes = [
        "Chúc bạn 20/10 thật vui vẻ, luôn xinh đẹp rạng rỡ và học tập thật tốt nhé. Mong bạn giữ mãi ngọn lửa nhiệt huyết với nghề giáo cao quý, để mai sau vững bước tự tin gieo mầm tri thức, truyền cảm hứng bất tận cho bao thế hệ học trò thân yêu của mình.", "Ngày 20/10, chúc cô giáo tương lai luôn duyên dáng, đáng yêu, ngập tràn hạnh phúc. Chúc bạn có những năm tháng sinh viên thật ý nghĩa, tích luỹ thật nhiều kiến thức, kỹ năng. Hãy luôn kiên nhẫn, yêu thương để sẵn sàng cho hành trình chèo lái con thuyền tri thức cập bến bờ thành công.", "Chúc bạn 20/10 thật ấm áp bên bạn bè và người thân. Mong bạn luôn là cô sinh viên Sư phạm rạng rỡ nhất, đầy năng lượng tích cực. Hãy chăm chỉ rèn luyện mỗi ngày, không chỉ kiến thức chuyên môn mà còn cả tấm lòng bao dung, để xứng đáng với sự tin yêu của lũ trẻ sau này.", "Nhân ngày Phụ nữ Việt Nam 20/10, chúc bạn luôn tự tin vào con đường mình đã chọn. Giảng đường hôm nay chính là bệ phóng vững chắc cho bục giảng ngày mai. Hãy học thật giỏi, rèn đức thật tốt, để trở thành người truyền lửa thắp sáng ước mơ cho các em nhỏ, bạn nhé.", "Chúc bạn 20/10 thật nhiều quà, nhiều hoa, và luôn xinh đẹp nhất khoa. Hy vọng bạn sẽ có thời sinh viên thật đáng nhớ, miệt mài bên những trang giáo án tương lai. Hãy giữ gìn sự dịu dàng, kiên trì của người nhà giáo, để chuẩn bị hành trang tốt nhất cho sự nghiệp trồng người.", "Chúc mừng 20/10! Chúc cô giáo tương lai luôn rạng rỡ nụ cười, vững vàng kiến thức. Con đường Sư phạm tuy vất vả nhưng rất vinh quang. Hãy nỗ lực học tập, trau dồi đạo đức để mai sau mang đến những bài giảng hay, đầy ắp tình yêu thương cho thế hệ măng non.", "Nhân ngày 20/10, mến chúc bạn thật nhiều niềm vui và luôn duyên dáng. Mong bạn luôn giữ được sự trong sáng, nhiệt huyết của tuổi trẻ Sư phạm. Hãy tin tưởng vào sứ mệnh cao cả mình đang theo đuổi, rèn luyện từng ngày để trở thành một nhà giáo ưu tú trong tương lai.", "20/10 thật ý nghĩa nhé, cô sinh viên Sư phạm. Chúc bạn luôn xinh đẹp, tự tin và đầy bản lĩnh. Hãy trang bị cho mình hành trang tri thức thật vững chắc, cùng một trái tim ấm áp, bao dung, sẵn sàng yêu thương, dìu dắt các em nhỏ đến bến bờ tri thức.", "Chúc bạn 20/10 ngập tràn yêu thương, luôn rạng rỡ như đoá hoa. Mong bạn luôn tự hào về màu áo sinh viên Sư phạm mình đang mặc. Hãy cố gắng học tập, rèn luyện không ngừng để mai sau trở thành người gieo mầm xanh hy vọng, chắp cánh cho bao ước mơ bay cao.", "Ngày 20/10, chúc bạn luôn xinh đẹp, học giỏi và đạt nhiều thành tích tốt. Hành trình trở thành giáo viên cần rất nhiều sự kiên nhẫn. Mong bạn luôn giữ lửa đam mê, mài giũa nghiệp vụ, để mai sau tự tin đứng trên bục giảng, lan toả tri thức và nhân cách.", "Chúc bạn một ngày 20/10 thật đặc biệt, luôn duyên dáng và toả sáng. Hãy tận hưởng thời sinh viên tươi đẹp, đồng thời không quên nhiệm vụ rèn đức luyện tài. Tương lai của giáo dục đang chờ đợi những cô giáo trẻ vừa có tâm vừa có tầm như bạn đó.", "Cô giáo tương lai ơi, 20/10 thật hạnh phúc nhé! Chúc bạn luôn tự tin, yêu đời, và thành công trên con đường học vấn. Mỗi kiến thức bạn học hôm nay là viên gạch xây dựng tương lai cho học trò. Hãy cố gắng để trở thành người lái đò tận tuỵ, bạn nhé!", "Mừng 20/10, chúc bạn luôn xinh đẹp, ngập tràn năng lượng tích cực. Mong bạn luôn tìm thấy niềm vui trong từng bài giảng, từng kỳ thực tập. Hãy tích luỹ thật nhiều kinh nghiệm, giữ vững tình yêu nghề, để sau này mang đến những giá trị tốt đẹp nhất cho ngành giáo dục.", "Chúc bạn 20/10 luôn rạng rỡ và an nhiên. Là sinh viên Sư phạm, bạn mang trên vai sứ mệnh thật đặc biệt. Hãy học tập chăm chỉ, rèn luyện kỹ năng sư phạm thật tốt, để mai sau trở thành điểm tựa vững chắc, truyền cảm hứng học tập cho biết bao thế hệ.", "Nhân 20/10, chúc bạn luôn xinh đẹp, vui tươi như chính lứa tuổi sinh viên. Mong bạn luôn kiên định với lý tưởng nghề giáo mình đã chọn. Hãy mài giũa viên ngọc tri thức và nhân cách trong mình, để sau này toả sáng, soi đường cho các em nhỏ bước tới tương lai.", "Chúc mừng 20/10, cô giáo tương lai! Mong bạn luôn giữ được nét duyên dáng, dịu dàng của người con gái Việt Nam. Hãy nỗ lực từng ngày trên giảng đường, để những trang giáo án tương lai không chỉ có kiến thức, mà còn chan chứa tình yêu thương con người sâu sắc.", "Chúc bạn 20/10 thật nhiều ý nghĩa, luôn tự tin thể hiện cá tính. Con đường Sư phạm đòi hỏi sự hy sinh thầm lặng. Mong bạn luôn bền bỉ, sáng tạo trong học tập, để mai sau trở thành người gieo hạt giống tâm hồn, vun đắp nên những nhân cách tốt đẹp.", "Ngày 20/10, chúc bạn luôn rạng rỡ, mạnh khoẻ và học tập tiến bộ. Hãy biến những năm tháng sinh viên thành kỷ niệm đáng nhớ, đầy ắp tri thức. Tấm lòng bao dung và sự kiên nhẫn chính là hành trang quý giá nhất của người thầy, hãy rèn luyện ngay từ hôm nay.", "Chúc bạn 20/10 luôn xinh đẹp trong mắt mọi người, và quan trọng nhất là xinh đẹp trong tâm hồn. Mong bạn luôn giữ được ngọn lửa yêu nghề, yêu trẻ. Hãy trau dồi không ngừng để trở thành cô giáo tài năng, đức độ, góp phần xây dựng nền giáo dục nước nhà.", "Nhân ngày 20/10, chúc bạn luôn duyên dáng, yêu đời. Chặng đường Sư phạm còn nhiều thử thách phía trước. Chúc bạn chân cứng đá mềm, học tập thật tốt, rèn luyện nghiệp vụ vững vàng, sẵn sàng cho sứ mệnh gieo con chữ, trồng người, thắp sáng tương lai cho đất nước.", "Mừng 20/10, chúc cô sinh viên Sư phạm luôn tự tin và toả sáng. Hãy dùng sự thông minh, nhiệt huyết của mình để chinh phục tri thức. Tương lai, chính bạn sẽ là người truyền cảm hứng, giúp các em nhỏ khám phá thế giới, thực hiện những hoài bão, ước mơ lớn lao.", "Chúc bạn 20/10 thật nhiều niềm vui, luôn xinh đẹp và an yên. Hãy trân trọng từng khoảnh khắc trên giảng đường, tích luỹ kiến thức thật chăm chỉ. Tình yêu thương và sự kiên trì của bạn hôm nay sẽ là nền tảng vững chắc cho những bài học ý nghĩa ngày mai.", "Nhân 20/10, chúc bạn luôn rạng rỡ, giữ mãi nụ cười tươi trên môi. Con đường bạn chọn thật đáng tự hào. Hãy học tập thật tốt, rèn luyện đạo đức nhà giáo, để mai sau trở thành người mẹ hiền thứ hai, dìu dắt, nâng đỡ bao thế hệ học trò nên người.", "Chúc mừng 20/10, cô giáo tương lai! Mong bạn luôn duyên dáng, thông tuệ và đầy nghị lực. Hãy luôn giữ cho mình một trái tim nhạy cảm, yêu thương con người. Sự nghiệp trồng người cần lắm những nhà giáo vừa giỏi chuyên môn, vừa giàu lòng nhân ái như bạn.", "Chúc bạn 20/10 luôn xinh đẹp, tự tin với lựa chọn của mình. Nghề giáo là nghề cao quý. Mong bạn sẽ nỗ lực không ngừng trong học tập, rèn luyện, chuẩn bị hành trang tốt nhất để bước lên bục giảng, gieo mầm tri thức và thắp sáng niềm tin cho thế hệ trẻ.", "Ngày 20/10, chúc bạn thật nhiều hoa, nhiều quà, và luôn rạng rỡ. Hãy là cô sinh viên Sư phạm năng động, sáng tạo. Tương lai đang chờ đón bạn với những lớp học trò đáng yêu. Hãy chuẩn bị thật kỹ, để mang đến cho các em những điều tuyệt vời nhất nhé.", "Chúc bạn 20/10 ngập tràn hạnh phúc, luôn xinh đẹp và học giỏi. Hãy luôn tự hào vì bạn đang theo đuổi một sứ mệnh vinh quang. Chăm chỉ học tập, rèn luyện bản lĩnh, để mai sau trở thành một giáo viên ưu tú, lan toả tình yêu tri thức đến mọi miền.", "Mừng 20/10, chúc bạn luôn duyên dáng, dịu dàng. Mong bạn có những năm tháng sinh viên thật rực rỡ, tích luỹ đầy đủ kiến thức và kỹ năng. Hãy giữ gìn sự kiên nhẫn, lòng yêu trẻ, đó sẽ là vũ khí bí mật giúp bạn thành công trên bục giảng tương lai.", "Chúc bạn 20/10 luôn tự tin, yêu đời và đạt kết quả học tập cao. Giảng đường Sư phạm là nơi ươm mầm những nhà giáo tâm huyết. Hãy nỗ lực mỗi ngày, rèn luyện cả tài lẫn đức, để xứng đáng với sự mong đợi, tin tưởng của xã hội và học trò thân yêu.", "Ngày 20/10 thật vui vẻ nhé, cô giáo tương lai! Chúc bạn luôn xinh đẹp, rạng rỡ và tràn đầy nhiệt huyết. Hãy dùng tuổi trẻ của mình để học tập, cống hiến. Mong bạn luôn giữ vững tình yêu với nghề, để mai sau mang tri thức soi rọi những tâm hồn trẻ thơ.",
    ];

    // --- Event Listeners ---
    nameForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = nameInput.value.trim();
        if (name) {
            currentName = name;
            showWishesScreen();
        } else {
            nameInput.classList.add('error');
            setTimeout(() => nameInput.classList.remove('error'), 500);
        }
    });

    envelope.addEventListener('click', () => {
        if (envelope.classList.contains('open')) return;
        envelope.classList.add('open');
        setTimeout(() => {
            wishContentContainer.classList.add('visible');
            bouquetContainer.classList.add('visible');
            displayRandomWish(currentName);
        }, 800); // Sync with envelope animation
    });

    newWishBtn.addEventListener('click', () => {
        wishContentContainer.classList.remove('visible');
        setTimeout(() => {
             displayRandomWish(currentName);
             wishContentContainer.classList.add('visible');
        }, 600);
    });

    // --- Music Logic ---
    function handleFirstMusicInteraction() { if (!musicTooltip.classList.contains('hidden')) musicTooltip.classList.add('hidden'); }
    function playMusic(songSrc) { backgroundMusic.src = songSrc; backgroundMusic.play().catch(e => console.log("Music play failed:", e)); musicPlaying = true; musicToggle.classList.add('active'); musicDisc.classList.add('playing'); }
    function pauseMusic() { backgroundMusic.pause(); musicPlaying = false; musicToggle.classList.remove('active'); musicDisc.classList.remove('playing'); }
    musicToggle.addEventListener('click', () => { handleFirstMusicInteraction(); if (musicPlaying) pauseMusic(); else { const song = document.querySelector('.song-item.active-song').dataset.song; playMusic(song || 'nhacnen.mp3'); } });
    songItems.forEach(item => { item.addEventListener('click', () => { handleFirstMusicInteraction(); songItems.forEach(i => i.classList.remove('active-song')); item.classList.add('active-song'); playMusic(item.dataset.song); }); });

    // --- Core Functions ---
    function showScreen(screenToShow) {
        document.querySelectorAll('.screen').forEach(s => s.classList.remove('active'));
        screenToShow.classList.add('active');
    }

    function showWishesScreen() {
        showScreen(wishesScreen);
        envelope.classList.remove('open');
        wishContentContainer.classList.remove('visible');
        bouquetContainer.classList.remove('visible');
        wishTextEl.innerHTML = '';
        signatureLine.textContent = '';
        greetingLine.textContent = '';
        signatureLine.classList.remove('visible');
        launchFireworks();
        musicTooltip.classList.remove('hidden');
    }

    function typeWish(greeting, signature, wish) {
        if (typeIntervalId) clearInterval(typeIntervalId);

        greetingLine.textContent = greeting;
        wishTextEl.innerHTML = '';
        signatureLine.textContent = signature;
        signatureLine.classList.remove('visible'); // Hide signature initially
        
        let charIndex = 0;
        typeIntervalId = setInterval(() => {
            if (charIndex < wish.length) {
                wishTextEl.innerHTML += wish.charAt(charIndex);
                charIndex++;
            } else {
                clearInterval(typeIntervalId);
                typeIntervalId = null;
                // Fade in signature ONLY after typing is complete
                setTimeout(() => signatureLine.classList.add('visible'), 300);
            }
        }, 55); // Slowed down for handwriting font
    }

    function displayRandomWish(name) {
        const randomIndex = Math.floor(Math.random() * longWishes.length);
        const wishContent = longWishes[randomIndex];
        const greetingContent = `Gửi ${name},`;
        const signatureContent = 'From Khánh Toàn with luv <3';
        typeWish(greetingContent, signatureContent, wishContent);
    }

    // --- Canvas & Effects Setup ---
    function setupCanvas() { if (wishesScreen.clientWidth > 0) { canvas.width = wishesScreen.clientWidth; canvas.height = wishesScreen.clientHeight; } }
    
    // Fireworks (already well-optimized)
    class Particle { constructor(x, y, color, type) { this.x = x; this.y = y; this.color = color; this.type = type; this.alpha = 1; if (type === 'firework') { this.sx = Math.random() * 4 - 2; this.sy = Math.random() * -3 - (canvas.height / 70); this.size = 2; this.targetY = Math.random() * (canvas.height / 2) + (canvas.height / 4); } else if (type === 'explosion') { const angle = Math.random() * Math.PI * 2; const speed = Math.random() * 8 + 2; this.sx = Math.cos(angle) * speed; this.sy = Math.sin(angle) * speed; this.friction = 0.96; this.gravity = 0.1; this.decay = Math.random() * 0.02 + 0.015; this.size = 2; } else if (type === 'trail') { this.sx = Math.random() * 2 - 1; this.sy = Math.random() * 2 - 1; this.gravity = 0.5; this.decay = Math.random() * 0.05 + 0.05; this.size = 1; } } update() { if (this.type === 'firework') { this.x += this.sx; this.y += this.sy; this.sy += 0.04; if (Math.random() > 0.4) particles.push(new Particle(this.x, this.y, this.color, 'trail')); if (this.y <= this.targetY || this.sy >= 0) { this.alpha = 0; for (let i = 0; i < 150; i++) particles.push(new Particle(this.x, this.y, this.color, 'explosion')); } } else { this.x += this.sx; this.y += this.sy; if (this.type === 'explosion') { this.sx *= this.friction; this.sy *= this.friction; this.sy += this.gravity; } else { this.sy += this.gravity; } this.alpha -= this.decay; } } draw(ctx) { ctx.save(); ctx.globalAlpha = this.alpha; ctx.fillStyle = this.color; ctx.beginPath(); ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2); ctx.fill(); ctx.restore(); } }
    
    function launchFireworks() {
        if (animationFrameId) cancelAnimationFrame(animationFrameId);
        if (fireworkLaunchIntervalId) clearInterval(fireworkLaunchIntervalId);
        particles.length = 0;
        
        setupCanvas(); 
        fireworkLaunchIntervalId = setInterval(() => { 
            if (wishesScreen.classList.contains('active')) { 
                const color = `hsl(${Math.random() * 360}, 100%, 60%)`; 
                particles.push(new Particle(Math.random() * canvas.width, canvas.height, color, 'firework')); 
            } 
        }, 1500); // Slower, more majestic fireworks
        
        loop(); 
    }
    
    function loop() {
        const ctx = canvas.getContext('2d');
        if (canvas.width > 0) {
            ctx.fillStyle = 'rgba(255, 253, 247, 0.1)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        for (let i = particles.length - 1; i >= 0; i--) {
            particles[i].update();
            particles[i].draw(ctx);
            if (particles[i].alpha <= 0) {
                particles.splice(i, 1);
            }
        }
        animationFrameId = requestAnimationFrame(loop);
    }
    
    // --- Initial Setup ---
    window.addEventListener('resize', setupCanvas);
});

