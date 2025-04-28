<script>
  import { onMount } from 'svelte';
  import Footer from '../lib/components/Footer.svelte';
  import Room3D from '../lib/components/Room3D.svelte';

  // 상태 관리
  let currentSection = 0;
  let showIntro = true;
  let isScrolling = false;
  const totalSections = 10;

  // Uni- 단어 변경 애니메이션 데이터
  const uniWords = [
    { id: 0, text: 'verse', tooltip: '우주' },
    { id: 1, text: 'versal', tooltip: '전 세계' },
    { id: 2, text: 'que', tooltip: '고유한' },
    { id: 3, text: 'Room', tooltip: '나만의 방' },
    { id: 4, text: 'Log', tooltip: '기록' },
    { id: 5, text: 'Fy', tooltip: '하나로' },
    { id: 6, text: 'ty', tooltip: '유일함' },
    { id: 7, text: 'son', tooltip: '조화' },
  ];

  // 각 섹션 컨텐츠 데이터
  const sectionContents = [
    {
      id: 0,
      content: '우리는 유저로부터 시작된 작은 <highlight>우주</highlight>입니다.',
      highlight: { text: '우주', tooltip: 'Uni-verse' }
    },
    {
      id: 1,
      content: '수많은 작은 우주들이 연결되어 <highlight>전 세계</highlight>로 확장되고,',
      highlight: { text: '전 세계', tooltip: 'Uni-versal' }
    },
    {
      id: 2,
      content: '각자의 <highlight>고유한</highlight> 개성을 가진 당신과 나(U&I)는 하나로 이어집니다.',
      highlight: { text: '고유한', tooltip: 'Uni-que' }
    },
    {
      id: 3,
      content: '이곳, <highlight>나만의 방</highlight>에서 당신만의 기록을 남기고,',
      highlight: { text: '나만의 방', tooltip: 'Uni-Room' }
    },
    {
      id: 4,
      content: '<highlight>Uni-Log</highlight>에서 모든 순간을 관리하며, 친숙한 2D UI를 통해 자유롭게 소셜 네트워킹을 경험하세요.',
      highlight: { text: 'Uni-Log', tooltip: 'Uni-Log' }
    },
    {
      id: 5,
      content: '이 모든 연결이 <highlight>연합</highlight>되고, <highlight2>하나로</highlight2> 이루어진 UniRoom에서',
      highlight: { text: '연합', tooltip: 'Union' },
      highlight2: { text: '하나로', tooltip: 'Uni-Fy' }
    },
    {
      id: 6,
      content: '당신의 <highlight>유일함</highlight>을 표현하세요.',
      highlight: { text: '유일함', tooltip: 'Uni-ty' }
    },
    {
      id: 7,
      content: '그것들은 틀림없이 <highlight>조화</highlight>로울 것입니다.',
      highlight: { text: '조화', tooltip: 'Uni-son' }
    }
  ];

  // 콘텐츠에서 하이라이트 처리
  function processContent(section) {
    if (!section) return '';
    
    let processed = section.content;
    
    // 첫 번째 하이라이트 처리
    if (section.highlight) {
      processed = processed.replace(
        `<highlight>${section.highlight.text}</highlight>`,
        `<span class="text-purple-600 font-semibold relative group cursor-help">
          ${section.highlight.text}
          <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-sm py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            ${section.highlight.tooltip}
          </span>
        </span>`
      );
    }
    
    // 두 번째 하이라이트 처리 (있는 경우)
    if (section.highlight2) {
      processed = processed.replace(
        `<highlight2>${section.highlight2.text}</highlight2>`,
        `<span class="text-purple-600 font-semibold relative group cursor-help">
          ${section.highlight2.text}
          <span class="absolute -top-8 left-1/2 -translate-x-1/2 bg-purple-600 text-white text-sm py-1 px-3 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
            ${section.highlight2.tooltip}
          </span>
        </span>`
      );
    }
    
    return processed;
  }

  // 기능 목록 데이터
  const features = [
    {
      icon: '🌌',
      title: '나만의 우주',
      description: '개인화된 공간에서 당신만의 아이디어와 경험을 기록하고 공유하세요.'
    },
    {
      icon: '🔄',
      title: '글로벌 연결',
      description: '전 세계 사용자들과 연결되어 새로운 관점과 인사이트를 얻을 수 있습니다.'
    },
    {
      icon: '📊',
      title: '통합 관리',
      description: '모든 기록과 활동을 한 곳에서 체계적으로 관리하고 분석할 수 있습니다.'
    },
  ];

  // 인트로 건너뛰기
  function skipIntro() {
    showIntro = false;
  }

  // 섹션 이동 함수
  function goToSection(newSection) {
    if (isScrolling) return;
    
    if (newSection < 0) newSection = 0;
    if (newSection > totalSections - 1) newSection = totalSections - 1;
    
    isScrolling = true;
    currentSection = newSection;
    
    setTimeout(() => {
      isScrolling = false;
    }, 700);
  }

  // 배경색 계산
  function getBackgroundColor(index) {
    const colors = [
      'bg-white',
      'bg-purple-50',
      'bg-purple-100',
      'bg-purple-100',
      'bg-purple-200',
      'bg-purple-200',
      'bg-purple-300',
      'bg-purple-300',
      'bg-purple-500',
      'bg-gray-900'
    ];
    return colors[index] || 'bg-white';
  }

  // 이벤트 리스너 설정
  onMount(() => {
    // 4초 후 인트로 자동으로 숨김
    const introTimer = setTimeout(() => {
      showIntro = false;
    }, 4000);

    // 휠 이벤트 처리
    const handleWheel = (e) => {
      e.preventDefault();
      
      if (showIntro) {
        skipIntro();
        return;
      }
      
      if (isScrolling) return;
      
      if (e.deltaY > 0) {
        goToSection(currentSection + 1);
      } else {
        goToSection(currentSection - 1);
      }
    };

    // 키보드 이벤트 처리
    const handleKeyDown = (e) => {
      if (showIntro) {
        skipIntro();
        return;
      }
      
      if ((e.key === 'ArrowDown' || e.key === 'PageDown') && !isScrolling) {
        e.preventDefault();
        goToSection(currentSection + 1);
      } else if ((e.key === 'ArrowUp' || e.key === 'PageUp') && !isScrolling) {
        e.preventDefault();
        goToSection(currentSection - 1);
      }
    };

    // 터치 이벤트 변수
    let touchStartY = 0;
    
    // 터치 시작 이벤트
    const handleTouchStart = (e) => {
      touchStartY = e.touches[0].clientY;
    };
    
    // 터치 종료 이벤트
    const handleTouchEnd = (e) => {
      if (showIntro) {
        skipIntro();
        return;
      }
      
      if (isScrolling) return;
      
      const touchEndY = e.changedTouches[0].clientY;
      const diff = touchStartY - touchEndY;
      
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          goToSection(currentSection + 1);
        } else {
          goToSection(currentSection - 1);
        }
      }
    };

    // 이벤트 리스너 등록
    window.addEventListener('wheel', handleWheel, { passive: false });
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: true });
    window.addEventListener('touchend', handleTouchEnd, { passive: true });

    // 인트로 스킵 이벤트
    window.addEventListener('click', skipIntro, { once: true });

    // 클린업 함수
    return () => {
      clearTimeout(introTimer);
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  });
</script>

<svelte:head>
  <style>
    @keyframes scale-in {
      0% { transform: scale(0); }
      60% { transform: scale(1.1); }
      100% { transform: scale(1); }
    }
    
    @keyframes fade-in-delayed {
      0%, 30% { opacity: 0; transform: translateY(20px); }
      100% { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes bounce-delayed {
      0%, 40% { opacity: 0; }
      60% { opacity: 1; }
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
    
    .animate-scale-in {
      animation: scale-in 1s forwards;
    }
    
    .animate-fade-in-delayed {
      animation: fade-in-delayed 1s 0.5s forwards;
    }
    
    .animate-bounce-delayed {
      animation: bounce-delayed 2s 1.5s forwards, bounce 2s 2.5s infinite;
    }
    
    @keyframes bounce {
      0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
      40% { transform: translateY(-10px); }
      60% { transform: translateY(-5px); }
    }
  </style>
</svelte:head>

<div class="h-screen w-full overflow-hidden">
  <!-- 3D Room 추가 -->
  <Room3D {currentSection} {totalSections} />
  
  <!-- 인트로 애니메이션 -->
  {#if showIntro}
    <div 
      class="fixed inset-0 bg-purple-600 bg-opacity-95 z-50 flex flex-col justify-center items-center transition-opacity duration-800"
      on:click={skipIntro}
    >
      <div class="text-5xl font-bold text-white mb-8 animate-scale-in">UniRoom</div>
      <div class="text-lg text-white text-center max-w-lg opacity-0 animate-fade-in-delayed">
        당신만의 공간에서 시작되는 아이디어의 우주.<br />
        스크롤을 내리면 UniRoom의 세계로 들어갑니다.
      </div>
      <div class="absolute bottom-12 text-white opacity-0 animate-bounce-delayed">
        아래로 스크롤하세요
        <div class="text-2xl mt-2 flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>
        </div>
      </div>
    </div>
  {/if}

  <!-- 헤더 -->
  <header class="fixed top-0 left-0 w-full bg-white bg-opacity-95 shadow-sm z-40 py-4 px-[10%] flex justify-between items-center">
    <a href="#" class="text-2xl font-bold text-purple-600">UniRoom</a>
    <nav class="hidden md:flex gap-8">
      <a href="#" class="text-gray-700 hover:text-purple-600 transition-colors font-medium">홈</a>
      <a href="/uniroom_landing/src/test/sc.html" class="text-gray-700 hover:text-purple-600 transition-colors font-medium">기능</a>
      <a href="#" class="text-gray-700 hover:text-purple-600 transition-colors font-medium">가격</a>
      <a href="#" class="text-gray-700 hover:text-purple-600 transition-colors font-medium">문의</a>
    </nav>
    <button class="bg-purple-600 text-white px-5 py-2 rounded font-medium hover:bg-purple-700 transition-colors">
      시작하기
    </button>
  </header>

  <!-- Uni- 애니메이션 헤더 -->
  <div class="fixed top-1/2 left-0 w-full flex justify-center items-center h-24 -translate-y-20 z-30 text-center transition-opacity duration-500 {currentSection >= 8 ? 'opacity-0 invisible' : 'opacity-100 visible'}">
    <div class="inline-flex items-center justify-center md:text-5xl text-3xl font-bold">
      <div class="text-purple-600">Uni-</div>
      <div class="relative h-16 w-44 overflow-hidden inline-block -ml-1">
        {#each uniWords as word, index}
          <div 
            class="absolute w-full left-0 transition-all duration-500 {currentSection === index ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}"
          >
            {word.text}
          </div>
        {/each}
      </div>
    </div>
  </div>

  <!-- 스크롤 인디케이터 -->
  <div class="fixed bottom-5 left-1/2 -translate-x-1/2 z-10 bg-white bg-opacity-80 px-4 py-2 rounded-full shadow-md text-gray-600 text-sm transition-opacity duration-300 {currentSection > 0 ? 'opacity-0' : 'opacity-100'} animate-bounce">
    스크롤하여 계속 보기 ↓
  </div>

  <!-- 메인 컨텐츠 -->
  <div 
    class="relative w-full h-full transition-transform duration-700 ease-in-out"
    style="transform: translateY(-{currentSection * 100}vh);"
  >
    {#each Array(totalSections).fill().map((_, i) => i) as sectionIndex}
      <!-- 섹션 1-8: 내용 섹션 -->
      {#if sectionIndex < 8}
        <section class="w-full h-screen flex justify-center items-center px-[10%] bg-opacity-80 {getBackgroundColor(sectionIndex)}">
          <div class="text-center text-xl md:text-2xl max-w-xl transition-all duration-500 transform {currentSection === sectionIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
            {@html processContent(sectionContents[sectionIndex])}
          </div>
        </section>
      <!-- 섹션 9: 기능 소개 -->
      {:else if sectionIndex === 8}
        <section class="w-full h-screen flex justify-center items-center px-[10%] bg-opacity-90 {getBackgroundColor(sectionIndex)}">
          <div class="max-w-6xl w-full transition-all duration-500 transform {currentSection === sectionIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
            <h2 class="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-600">UniRoom의 특별한 기능</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              {#each features as feature, featureIndex}
                <div 
                  class="bg-white rounded-lg p-8 shadow-lg text-center transform transition-all duration-700 hover:-translate-y-2 hover:shadow-xl"
                  style="transition-delay: {featureIndex * 150}ms"
                >
                  <div class="text-4xl mb-5">{feature.icon}</div>
                  <h3 class="text-xl font-bold mb-4 text-gray-800">{feature.title}</h3>
                  <p class="text-gray-600">{feature.description}</p>
                </div>
              {/each}
            </div>
          </div>
        </section>
      <!-- 섹션 10: CTA & 푸터 -->
      {:else if sectionIndex === 9}
        <section class="w-full h-screen flex flex-col justify-between items-center px-[10%] py-16 bg-opacity-95 {getBackgroundColor(sectionIndex)}">
          <!-- CTA 섹션 -->
          <div class="max-w-4xl w-full text-center text-white mt-16 transition-all duration-500 transform {currentSection === sectionIndex ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}">
            <h2 class="text-3xl md:text-4xl font-bold mb-6">지금 바로 UniRoom을 시작하세요</h2>
            <p class="text-xl mb-10 max-w-2xl mx-auto">
              당신만의 고유한 공간에서 무한한 가능성을 경험하세요. 
              지금 가입하면 프리미엄 기능을 1개월 무료로 사용할 수 있습니다.
            </p>
            <button class="bg-white text-purple-600 px-8 py-4 rounded-md text-lg font-semibold hover:bg-gray-100 transition-transform transform hover:scale-105">
              무료로 시작하기
            </button>
          </div>
          
          <!-- 푸터 -->
          <div class="transition-all duration-500 transform {currentSection === sectionIndex ? 'opacity-100' : 'opacity-0'}" style="transition-delay: 300ms">
            <Footer />
          </div>
        </section>
      {/if}
    {/each}
  </div>
</div>