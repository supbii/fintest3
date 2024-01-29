document.addEventListener('DOMContentLoaded', function() {
    // 커서 팡 이미지 위치 설정
    const pangContainer = document.getElementById('pangcontainer');
    const pang = document.getElementById('pang');

    document.addEventListener('click', (event) => {
        const offsetX = 120;
        const offsetY = 870;
    
        pangContainer.style.left = (event.pageX - offsetX) + 'px';
        pangContainer.style.top = (event.pageY - offsetY) + 'px';
        pangContainer.style.display = 'block';

        setTimeout(() => {
            pangContainer.style.display = 'none';
        }, 500);
    });

        // 상단 버튼
        let savedStates = [];

        const animals = ['vc', 'fl', 'uku', 'djb', 'dr', 'vn', 'trb', 'gtr', 'pf', 'cb', 'trp', 'vo'];

        animals.forEach(animal => {
            document.getElementById(`${animal}standby`).addEventListener('click', () => {
                toggleAnimalState(animal);
                updateSaveButtonState(); // 상태 업데이트 호출
            });
        });
    
        function toggleAnimalState(animalId) {
            const animalMusic = document.getElementById(`${animalId}Music`);
            animalMusic.muted = !animalMusic.muted;
            updateAnimalImages(animalId, animalMusic.muted);
            updateSaveButtonState();
        }

        function loadCombination(index) {
            const state = savedStates[index];
        
            Object.keys(state).forEach(animal => {
                const isMuted = !state[animal];
                document.getElementById(`${animal}Music`).muted = isMuted;
                const standbyImage = document.getElementById(`${animal}standby`);
                const play1Image = document.getElementById(`${animal}play1`);
                const play2Image = document.getElementById(`${animal}play2`);
        
                if (!isMuted) {
                    standbyImage.style.display = 'none';
                    play1Image.style.display = 'block';
                    play2Image.style.display = 'none';
                } else {
                    standbyImage.style.display = 'block';
                    play1Image.style.display = 'none';
                    play2Image.style.display = 'none';
                }
            });
            updateSaveButtonState(); // 상태 업데이트 호출 추가
        }

        // '저장하기' 버튼 상태 업데이트 함수
        function updateSaveButtonState() {
            const saveButton = document.getElementById('saveButton');
            if (isAnyAnimalActive()) {
                saveButton.disabled = false;
                saveButton.style.opacity = 1;
            } else {
                saveButton.disabled = true;
                saveButton.style.opacity = 0.5;
            }
        }

        function isAnyAnimalActive() {
            return animals.some(animal => !document.getElementById(`${animal}Music`).muted);
        }
        
        // 동물들의 현재 상태 저장
        function saveCurrentState() {
            const currentState = {
                vc: !document.getElementById('vcMusic').muted,
                fl: !document.getElementById('flMusic').muted,
                uku: !document.getElementById('ukuMusic').muted,
                djb: !document.getElementById('djbMusic').muted,
                dr: !document.getElementById('drMusic').muted,
                vn: !document.getElementById('vnMusic').muted,
                trb: !document.getElementById('trbMusic').muted,
                gtr: !document.getElementById('gtrMusic').muted,
                pf: !document.getElementById('pfMusic').muted,
                cb: !document.getElementById('cbMusic').muted,
                trp: !document.getElementById('trpMusic').muted,
                vo: !document.getElementById('voMusic').muted,
            };

            // 동일한 조합이 이미 저장되었는지 확인
            const isDuplicate = savedStates.some(state => 
                Object.keys(state).every(animal => 
                    state[animal] === currentState[animal]
                )
            );

            if (!isDuplicate) {
                if (savedStates.length >= 5) {
                    // 5개 이상이면 가장 오래된 것 제거 후 새 조합 추가
                    savedStates.shift();
                }
                savedStates.push(currentState); // 새로운 조합 추가
                updateSavedCombinationsUI();
            }

            // 새로 저장된 조합의 인덱스를 계산하여 애니메이션 적용
            const newCombIndex = savedStates.length >= 5 ? 5 : savedStates.length;
            const newCombElement = document.getElementById(`comb${newCombIndex}`);
            newCombElement.classList.add('newComb');
            setTimeout(() => {
                newCombElement.classList.remove('newComb');
            }, 1000);

            showSaveConfirmationPopup();
        }
    
        function showSaveConfirmationPopup() {
            const popup = document.getElementById('saveConfirmationPopup');
            popup.style.display = 'block';
        
            setTimeout(() => {
                popup.style.display = 'none';
            }, 800);
        }

        // 저장된 조합을 UI에 표시
        function updateSavedCombinationsUI() {
            for (let i = 0; i < 5; i++) {
                const combElement = document.getElementById(`comb${i + 1}`);
                if (i < savedStates.length) {
                    // 저장된 조합의 개수에 따라 텍스트 업데이트
                    combElement.textContent = `조합 ${i + 1}`;
                    combElement.onclick = () => loadCombination(i);
                } else {
                    // 비어있는 조합 버튼 처리
                    combElement.textContent = '';
                    combElement.onclick = null;
                }
            }
        }
    
        // 특정 조합 불러오기
        function loadCombination(index) {
            const state = savedStates[index];

            Object.keys(state).forEach(animal => {
                const isMuted = !state[animal];
                document.getElementById(`${animal}Music`).muted = isMuted;
                const standbyImage = document.getElementById(`${animal}standby`);
                const play1Image = document.getElementById(`${animal}play1`);
                const play2Image = document.getElementById(`${animal}play2`);
        
                if (!isMuted) {
                    standbyImage.style.display = 'none';
                    play1Image.style.display = 'block';
                    play2Image.style.display = 'none';
                    if (animal === 'vo') {
                        switchToVoPlay1();
                    }
                } else {
                    standbyImage.style.display = 'block';
                    play1Image.style.display = 'none';
                    play2Image.style.display = 'none';
                    if (animal === 'vo') {
                        switchToVoStandby();
                    }
                }
            });
        }
        document.getElementById('saveButton').addEventListener('click', saveCurrentState);
    
        // 초기 상태 업데이트
        updateSavedCombinationsUI();
        updateSaveButtonState();
        updateSaveButtonState();

    var vcStandby = document.getElementById('vcstandby');
    var vcPlay1 = document.getElementById('vcplay1');
    var vcPlay2 = document.getElementById('vcplay2');
    var vcMusic = document.getElementById('vcMusic');
    var vcTimerId;

    var flStandby = document.getElementById('flstandby');
    var flPlay1 = document.getElementById('flplay1');
    var flPlay2 = document.getElementById('flplay2');
    var flMusic = document.getElementById('flMusic');
    var flTimerId;

    var ukuStandby = document.getElementById('ukustandby');
    var ukuPlay1 = document.getElementById('ukuplay1');
    var ukuPlay2 = document.getElementById('ukuplay2');
    var ukuMusic = document.getElementById('ukuMusic');
    var ukuTimerId;

    var djbStandby = document.getElementById('djbstandby');
    var djbPlay1 = document.getElementById('djbplay1');
    var djbPlay2 = document.getElementById('djbplay2');
    var djbMusic = document.getElementById('djbMusic');
    var djbTimerId;

    var drStandby = document.getElementById('drstandby');
    var drPlay1 = document.getElementById('drplay1');
    var drPlay2 = document.getElementById('drplay2');
    var drMusic = document.getElementById('drMusic');
    var drTimerId;

    var vnStandby = document.getElementById('vnstandby');
    var vnPlay1 = document.getElementById('vnplay1');
    var vnPlay2 = document.getElementById('vnplay2');
    var vnMusic = document.getElementById('vnMusic');
    var vnTimerId;

    var trbStandby = document.getElementById('trbstandby');
    var trbPlay1 = document.getElementById('trbplay1');
    var trbPlay2 = document.getElementById('trbplay2');
    var trbMusic = document.getElementById('trbMusic');
    var trbTimerId;

    var gtrStandby = document.getElementById('gtrstandby');
    var gtrPlay1 = document.getElementById('gtrplay1');
    var gtrPlay2 = document.getElementById('gtrplay2');
    var gtrMusic = document.getElementById('gtrMusic');
    var gtrTimerId;

    var pfStandby = document.getElementById('pfstandby');
    var pfPlay1 = document.getElementById('pfplay1');
    var pfPlay2 = document.getElementById('pfplay2');
    var pfMusic = document.getElementById('pfMusic');
    var pfTimerId;

    var cbStandby = document.getElementById('cbstandby');
    var cbPlay1 = document.getElementById('cbplay1');
    var cbPlay2 = document.getElementById('cbplay2');
    var cbMusic = document.getElementById('cbMusic');
    var cbTimerId;

    var trpStandby = document.getElementById('trpstandby');
    var trpPlay1 = document.getElementById('trpplay1');
    var trpPlay2 = document.getElementById('trpplay2');
    var trpMusic = document.getElementById('trpMusic');
    var trpTimerId;

    var voStandby = document.getElementById('vostandby');
    var voPlay1 = document.getElementById('voplay1');
    var voPlay2 = document.getElementById('voplay2');
    var voMusic = document.getElementById('voMusic');
    var voTimerId;
    var isMoved = false;
    var voShadow = document.getElementById('voshadow');

    vcMusic.volume = 0.6;
    flMusic.volume = 0.8;
    ukuMusic.volume = 0.5;
    djbMusic.volume = 1;
    drMusic.volume = 1;
    vnMusic.volume = 0.6;
    trbMusic.volume = 1;
    gtrMusic.volume = 1;
    pfMusic.volume = 1;
    cbMusic.volume = 1;
    trpMusic.volume = 0.9;
    voMusic.volume = 0.8;

    var play1Duration = 6000;
    var play2Duration = 4000;

    var isMusicPlayed = false;

    function playAllMusic() {
        vcMusic.play();
        flMusic.play();
        ukuMusic.play();
        djbMusic.play();
        drMusic.play();
        vnMusic.play();
        trbMusic.play();
        gtrMusic.play();
        pfMusic.play();
        cbMusic.play();
        trpMusic.play();
        isMusicPlayed = true;
    }

    function switchToVcPlay1() {
        vcPlay1.style.display = 'block';
        vcPlay2.style.display = 'none';
        vcStandby.style.display = 'none';
        vcMusic.muted = false;
        vcTimerId = setTimeout(switchToVcPlay2, play1Duration);
        updateSaveButtonState();
    }

    function switchToVcPlay2() {
        vcPlay2.style.display = 'block';
        vcPlay1.style.display = 'none';
        vcStandby.style.display = 'none';
        vcMusic.muted = false;
        vcTimerId = setTimeout(switchToVcPlay1, play2Duration);
        updateSaveButtonState();
    }

    function switchToVcStandby() {
        vcPlay1.style.display = 'none';
        vcPlay2.style.display = 'none';
        vcStandby.style.display = 'block';
        vcMusic.muted = true;
        vcMusic.currentTime = 0;
        clearTimeout(vcTimerId);
        updateSaveButtonState();
    }

    vcStandby.addEventListener('click', switchToVcPlay1);
    vcPlay1.addEventListener('click', switchToVcStandby);
    vcPlay2.addEventListener('click', switchToVcStandby);
    // 여기까지 첼로

    function switchToFlPlay1() {
        flPlay1.style.display = 'block';
        flPlay2.style.display = 'none';
        flStandby.style.display = 'none';
        flMusic.muted = false;
        flTimerId = setTimeout(switchToFlPlay2, play1Duration);
        updateSaveButtonState();
    }

    function switchToFlPlay2() {
        flPlay2.style.display = 'block';
        flPlay1.style.display = 'none';
        flStandby.style.display = 'none';
        flMusic.muted = false;
        flTimerId = setTimeout(switchToFlPlay1, play2Duration);
        updateSaveButtonState();
    }

    function switchToFlStandby() {
        flPlay1.style.display = 'none';
        flPlay2.style.display = 'none';
        flStandby.style.display = 'block';
        flMusic.muted = true;
        flMusic.currentTime = 0;
        clearTimeout(flTimerId);
        updateSaveButtonState();
    }

    flStandby.addEventListener('click', switchToFlPlay1);
    flPlay1.addEventListener('click', switchToFlStandby);
    flPlay2.addEventListener('click', switchToFlStandby);
    // 여기까지 플룻

    function switchToUkuPlay1() {
        ukuPlay1.style.display = 'block';
        ukuPlay2.style.display = 'none';
        ukuStandby.style.display = 'none';
        ukuMusic.muted = false;
        ukuTimerId = setTimeout(switchToUkuPlay2, play1Duration);
        updateSaveButtonState();
    }
    
    function switchToUkuPlay2() {
        ukuPlay2.style.display = 'block';
        ukuPlay1.style.display = 'none';
        ukuStandby.style.display = 'none';
        ukuMusic.muted = false;
        ukuTimerId = setTimeout(switchToUkuPlay1, play2Duration);
        updateSaveButtonState();
    }
    
    function switchToUkuStandby() {
        ukuPlay1.style.display = 'none';
        ukuPlay2.style.display = 'none';
        ukuStandby.style.display = 'block';
        ukuMusic.muted = true;
        ukuMusic.currentTime = 0;
        clearTimeout(ukuTimerId);
        updateSaveButtonState();
    }
    
    ukuStandby.addEventListener('click', switchToUkuPlay1);
    ukuPlay1.addEventListener('click', switchToUkuStandby);
    ukuPlay2.addEventListener('click', switchToUkuStandby);
    // 여기까지 우쿨렐레

    function switchToDjbPlay1() {
        djbPlay1.style.display = 'block';
        djbPlay2.style.display = 'none';
        djbStandby.style.display = 'none';
        djbMusic.muted = false;
        djbTimerId = setTimeout(switchToDjbPlay2, play1Duration);
        updateSaveButtonState();
    }

    function switchToDjbPlay2() {
        djbPlay2.style.display = 'block';
        djbPlay1.style.display = 'none';
        djbStandby.style.display = 'none';
        djbMusic.muted = false;
        djbTimerId = setTimeout(switchToDjbPlay1, play2Duration);
        updateSaveButtonState();
    }

    function switchToDjbStandby() {
        djbPlay1.style.display = 'none';
        djbPlay2.style.display = 'none';
        djbStandby.style.display = 'block';
        djbMusic.muted = true;
        djbMusic.currentTime = 0;
        clearTimeout(djbTimerId);
        updateSaveButtonState();
    }

    djbStandby.addEventListener('click', switchToDjbPlay1);
    djbPlay1.addEventListener('click', switchToDjbStandby);
    djbPlay2.addEventListener('click', switchToDjbStandby);
    // 여기까지 젬베

    function switchToDrPlay1() {
        drPlay1.style.display = 'block';
        drPlay2.style.display = 'none';
        drStandby.style.display = 'none';
        drMusic.muted = false;
        drTimerId = setTimeout(switchToDrPlay2, play1Duration);
        updateSaveButtonState();
    }
    
    function switchToDrPlay2() {
        drPlay2.style.display = 'block';
        drPlay1.style.display = 'none';
        drStandby.style.display = 'none';
        drMusic.muted = false;
        drTimerId = setTimeout(switchToDrPlay1, play2Duration);
        updateSaveButtonState();
    }
    
    function switchToDrStandby() {
        drPlay1.style.display = 'none';
        drPlay2.style.display = 'none';
        drStandby.style.display = 'block';
        drMusic.muted = true;
        drMusic.currentTime = 0;
        clearTimeout(drTimerId);
        updateSaveButtonState();
    }
    
    drStandby.addEventListener('click', switchToDrPlay1);
    drPlay1.addEventListener('click', switchToDrStandby);
    drPlay2.addEventListener('click', switchToDrStandby);
    // 여기까지 드럼

    function switchToVnPlay1() {
        vnPlay1.style.display = 'block';
        vnPlay2.style.display = 'none';
        vnStandby.style.display = 'none';
        vnMusic.muted = false;
        vnTimerId = setTimeout(switchToVnPlay2, play1Duration);
        updateSaveButtonState();
    }
    
    function switchToVnPlay2() {
        vnPlay2.style.display = 'block';
        vnPlay1.style.display = 'none';
        vnStandby.style.display = 'none';
        vnMusic.muted = false;
        vnTimerId = setTimeout(switchToVnPlay1, play2Duration);
        updateSaveButtonState();
    }

    function switchToVnStandby() {
        vnPlay1.style.display = 'none';
        vnPlay2.style.display = 'none';
        vnStandby.style.display = 'block';
        vnMusic.muted = true;
        vnMusic.currentTime = 0;
        clearTimeout(vnTimerId);
        updateSaveButtonState();
        }
        
    vnStandby.addEventListener('click', switchToVnPlay1);
    vnPlay1.addEventListener('click', switchToVnStandby);
    vnPlay2.addEventListener('click', switchToVnStandby);
    // 여기까지 바이올린

    function switchToTrbPlay1() {
        trbPlay1.style.display = 'block';
        trbPlay2.style.display = 'none';
        trbStandby.style.display = 'none';
        trbMusic.muted = false;
        trbTimerId = setTimeout(switchToTrbPlay2, play1Duration);
        updateSaveButtonState();
    }
    
    function switchToTrbPlay2() {
        trbPlay2.style.display = 'block';
        trbPlay1.style.display = 'none';
        trbStandby.style.display = 'none';
        trbMusic.muted = false;
        trbTimerId = setTimeout(switchToTrbPlay1, play2Duration);
        updateSaveButtonState();
    }
    
    function switchToTrbStandby() {
        trbPlay1.style.display = 'none';
        trbPlay2.style.display = 'none';
        trbStandby.style.display = 'block';
        trbMusic.muted = true;
        trbMusic.currentTime = 0;
        clearTimeout(trbTimerId);
        updateSaveButtonState();
    }
    
    trbStandby.addEventListener('click', switchToTrbPlay1);
    trbPlay1.addEventListener('click', switchToTrbStandby);
    trbPlay2.addEventListener('click', switchToTrbStandby);
    // 여기까지 트럼본

    function switchToGtrPlay1() {
        gtrPlay1.style.display = 'block';
        gtrPlay2.style.display = 'none';
        gtrStandby.style.display = 'none';
        gtrMusic.muted = false;
        gtrTimerId = setTimeout(switchToGtrPlay2, play1Duration);
        updateSaveButtonState();
    }
    
    function switchToGtrPlay2() {
        gtrPlay2.style.display = 'block';
        gtrPlay1.style.display = 'none';
        gtrStandby.style.display = 'none';
        gtrMusic.muted = false;
        gtrTimerId = setTimeout(switchToGtrPlay1, play2Duration);
        updateSaveButtonState();
    }
    
    function switchToGtrStandby() {
        gtrPlay1.style.display = 'none';
        gtrPlay2.style.display = 'none';
        gtrStandby.style.display = 'block';
        gtrMusic.pause();
        gtrMusic.muted = true;
        clearTimeout(gtrTimerId);
        updateSaveButtonState();
    }
    
    gtrStandby.addEventListener('click', switchToGtrPlay1);
    gtrPlay1.addEventListener('click', switchToGtrStandby);
    gtrPlay2.addEventListener('click', switchToGtrStandby);
    // 여기까지 기타

    function switchToPfPlay1() {
        pfPlay1.style.display = 'block';
        pfPlay2.style.display = 'none';
        pfStandby.style.display = 'none';
        pfMusic.muted = false;
        pfTimerId = setTimeout(switchToPfPlay2, play1Duration);
        updateSaveButtonState();
    }
    
    function switchToPfPlay2() {
        pfPlay2.style.display = 'block';
        pfPlay1.style.display = 'none';
        pfStandby.style.display = 'none';
        pfMusic.muted = false;
        pfTimerId = setTimeout(switchToPfPlay1, play2Duration);
        updateSaveButtonState();
    }
    
    function switchToPfStandby() {
        pfPlay1.style.display = 'none';
        pfPlay2.style.display = 'none';
        pfStandby.style.display = 'block';
        pfMusic.muted = true;
        pfMusic.currentTime = 0;
        clearTimeout(pfTimerId);
        updateSaveButtonState();
    }
    
    pfStandby.addEventListener('click', switchToPfPlay1);
    pfPlay1.addEventListener('click', switchToPfStandby);
    pfPlay2.addEventListener('click', switchToPfStandby);
    // 여기까지 피아노

    function switchToCbPlay1() {
        cbPlay1.style.display = 'block';
        cbPlay2.style.display = 'none';
        cbStandby.style.display = 'none';
        cbMusic.muted = false;
        cbTimerId = setTimeout(switchToCbPlay2, play1Duration);
        updateSaveButtonState();
    }
    
    function switchToCbPlay2() {
        cbPlay2.style.display = 'block';
        cbPlay1.style.display = 'none';
        cbStandby.style.display = 'none';
        cbMusic.muted = false;
        cbTimerId = setTimeout(switchToCbPlay1, play2Duration);
        updateSaveButtonState();
    }
    
    function switchToCbStandby() {
        cbPlay1.style.display = 'none';
        cbPlay2.style.display = 'none';
        cbStandby.style.display = 'block';
        cbMusic.muted = true;
        cbMusic.currentTime = 0;
        clearTimeout(cbTimerId);
        updateSaveButtonState();
    }
    
    cbStandby.addEventListener('click', switchToCbPlay1);
    cbPlay1.addEventListener('click', switchToCbStandby);
    cbPlay2.addEventListener('click', switchToCbStandby);
    // 여기까지 콘베

    function switchToTrpPlay1() {
        trpPlay1.style.display = 'block';
        trpPlay2.style.display = 'none';
        trpStandby.style.display = 'none';
        trpMusic.muted = false;
        trpTimerId = setTimeout(switchToTrpPlay2, play1Duration);
        updateSaveButtonState();
    }
    
    function switchToTrpPlay2() {
        trpPlay2.style.display = 'block';
        trpPlay1.style.display = 'none';
        trpStandby.style.display = 'none';
        trpMusic.muted = false;
        trpTimerId = setTimeout(switchToTrpPlay1, play2Duration);
        updateSaveButtonState();
    }
    
    function switchToTrpStandby() {
        trpPlay1.style.display = 'none';
        trpPlay2.style.display = 'none';
        trpStandby.style.display = 'block';
        trpMusic.muted = true;
        trpMusic.currentTime = 0;
        clearTimeout(trpTimerId);
        updateSaveButtonState();
    }
    
    trpStandby.addEventListener('click', switchToTrpPlay1);
    trpPlay1.addEventListener('click', switchToTrpStandby);
    trpPlay2.addEventListener('click', switchToTrpStandby);
    // 여기까지 트럼펫

    function switchToVoPlay1() {
        voPlay1.style.display = 'block';
        voPlay2.style.display = 'none';
        voStandby.style.display = 'none';
        voMusic.play();
        voMusic.muted = false;
        voTimerId = setTimeout(switchToVoPlay2, play1Duration);
        voShadow.style.display = 'block';
    }
    
    function switchToVoPlay2() {
        voPlay2.style.display = 'block';
        voPlay1.style.display = 'none';
        voStandby.style.display = 'none';
        voMusic.muted = false;
        voTimerId = setTimeout(switchToVoPlay1, play2Duration);
    }
    
    function switchToVoStandby() {
        voPlay1.style.display = 'none';
        voPlay2.style.display = 'none';
        voStandby.style.display = 'block';
        voMusic.muted = true;
        voMusic.currentTime = 0;
        clearTimeout(voTimerId);
        setTimeout(function () {
            voStandby.style.transition = 'transform 0.5s ease-in-out';
            voStandby.style.transform = 'translateX(0)';
            voShadow.style.transition = 'transform 0.5s ease-in-out';
            voShadow.style.transform = 'translateX(0) rotate(-6.5deg)';
            setTimeout(function() {
                voShadow.style.display = 'none';
            }, 300);
        }, 200);
        isMoved = false;
    }

    voStandby.addEventListener('click', function () {
        if (!isMoved) {
            isMoved = true;
            voStandby.style.transition = 'transform 0.5s ease-in-out';
            voStandby.style.transform = 'translateX(65%)';
            voShadow.style.display = 'block';
            setTimeout(function() {
                voShadow.style.transition = 'transform 0.5s ease-in-out';
                voShadow.style.transform = 'translateX(65%) rotate(-6.5deg)';
            }, 100);
        } else {
            switchToVoPlay1();
        }
    });

    voPlay1.addEventListener('click', switchToVoStandby);
    voPlay2.addEventListener('click', switchToVoStandby);
    // 여기까지 보컬

    var popup = document.getElementById("popup");
    var popupBack = document.getElementById("popup-back");
    var popupParagraph = document.querySelector(".popup-content p");
    var signImage = document.getElementById("sign");

    var currentPage = 1;
    var totalPages = 2;

    var page1 = document.getElementById('page1');
    var page2 = document.getElementById('page2');
    var prevButton = document.getElementById('prevButton');
    var nextButton = document.getElementById('nextButton');

    window.onload = function() {
        currentPage = 1;
        updatePages(); 
        popup.style.display = "block";
        popupBack.style.display = "block";
    };
    signImage.onclick = function(event) {
        event.stopPropagation();
        currentPage = 1;
        updatePages(); 
        popup.style.display = "block";
        popupBack.style.display = "block";
    };
    // 팝업 외부 클릭 시 닫기 이벤트
    window.onclick = function(event) {
        if (!popup.contains(event.target)) {
            popup.style.display = "none";
            popupBack.style.display = "none";
        }
    };
    // 오버레이 클릭 시 팝업 닫기
    popupBack.onclick = function() {
        playAllMusic();
        popup.style.display = "none";
        popupBack.style.display = "none";
    };

        nextButton.onclick = function(event) {
            event.stopPropagation(); // 이벤트 버블링 중단
            popupContent.classList.add('next-page');
        };
        
        prevButton.onclick = function(event) {
            event.stopPropagation(); // 이벤트 버블링 중단
            popupContent.classList.add('prev-page');
        };
        function updatePages() {
            page1.style.display = currentPage === 1 ? 'block' : 'none';
            page2.style.display = currentPage === 2 ? 'block' : 'none';
        }
        prevButton.onclick = function(event) {
            event.stopPropagation();
            if (currentPage > 1) {
                currentPage--;
                updatePages();
            }
        };
        nextButton.onclick = function(event) {
            event.stopPropagation();
            if (currentPage < totalPages) {
                currentPage++;
                updatePages();
            }
        };
        updatePages();
});