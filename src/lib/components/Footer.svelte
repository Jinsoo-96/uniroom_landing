<script>
  // 언어 상태 관리
  let language = 'ko'; // 'ko', 'en-us', 'en-uk'
  
  // 국가/언어별 푸터 콘텐츠
  const footerContent = {
    'ko': {
      companyInfo: {
        title: '회사 정보',
        content: [
          { name: '상호명', value: 'UniRoom 주식회사' },
          { name: '대표자', value: '홍길동' },
          { name: '사업자등록번호', value: '123-45-67890' },
          { name: '통신판매업 신고번호', value: '제2025-서울강남-1234호' },
          { name: '주소', value: '서울특별시 강남구 테헤란로 123' }
        ]
      },
      categories: [
        {
          title: 'UniRoom',
          links: [
            { name: '소개', url: '#' },
            { name: '채용', url: '#' },
            { name: '블로그', url: '#' }
          ]
        },
        {
          title: '제품',
          links: [
            { name: '기능', url: '#' },
            { name: '요금제', url: '#' },
            { name: '업데이트', url: '#' }
          ]
        },
        {
          title: '지원',
          links: [
            { name: '도움말', url: '#' },
            { name: '문의하기', url: '#' },
            { name: '개인정보처리방침', url: '#' },
            { name: '이용약관', url: '#' },
            { name: '청소년보호정책', url: '#' }
          ]
        }
      ],
      legalInfo: {
        title: '법적 정보',
        content: [
          '개인정보보호책임자: 김정보 (info@uniroom.com)',
          '고객센터: 02-123-4567 (평일 10:00 ~ 18:00, 공휴일 제외)'
        ]
      },
      copyright: '© 2025 UniRoom. All rights reserved.'
    },
    'en-us': {
      companyInfo: {
        title: 'Company Information',
        content: [
          { name: 'Company Name', value: 'UniRoom Inc.' },
          { name: 'CEO', value: 'John Doe' },
          { name: 'Address', value: '123 Tech Blvd, San Francisco, CA 94107' }
        ]
      },
      categories: [
        {
          title: 'UniRoom',
          links: [
            { name: 'About', url: '#' },
            { name: 'Careers', url: '#' },
            { name: 'Blog', url: '#' }
          ]
        },
        {
          title: 'Product',
          links: [
            { name: 'Features', url: '#' },
            { name: 'Pricing', url: '#' },
            { name: 'Updates', url: '#' }
          ]
        },
        {
          title: 'Support',
          links: [
            { name: 'Help Center', url: '#' },
            { name: 'Contact Us', url: '#' },
            { name: 'Privacy Policy', url: '#' },
            { name: 'Terms of Service', url: '#' },
            { name: 'Cookie Policy', url: '#' },
            { name: 'Accessibility', url: '#' },
            { name: 'CCPA Privacy Rights', url: '#' }
          ]
        }
      ],
      legalInfo: {
        title: 'Legal Information',
        content: [
          'Data Protection Officer: data-protection@uniroom.com',
          'Customer Support: +1 (800) 123-4567 (Mon-Fri, 9am-5pm PT)'
        ]
      },
      copyright: '© 2025 UniRoom Inc. All rights reserved.'
    },
    'en-uk': {
      companyInfo: {
        title: 'Company Information',
        content: [
          { name: 'Company Name', value: 'UniRoom Ltd.' },
          { name: 'Company No', value: '12345678' },
          { name: 'VAT No', value: 'GB 123 4567 89' },
          { name: 'Registered Address', value: '123 Tech Street, London, EC1A 1BB' }
        ]
      },
      categories: [
        {
          title: 'UniRoom',
          links: [
            { name: 'About', url: '#' },
            { name: 'Careers', url: '#' },
            { name: 'Blog', url: '#' }
          ]
        },
        {
          title: 'Product',
          links: [
            { name: 'Features', url: '#' },
            { name: 'Pricing', url: '#' },
            { name: 'Updates', url: '#' }
          ]
        },
        {
          title: 'Support',
          links: [
            { name: 'Help Centre', url: '#' },
            { name: 'Contact Us', url: '#' },
            { name: 'Privacy Policy', url: '#' },
            { name: 'Terms of Service', url: '#' },
            { name: 'Cookie Policy', url: '#' },
            { name: 'Accessibility', url: '#' }
          ]
        }
      ],
      legalInfo: {
        title: 'Legal Information',
        content: [
          'Data Protection Officer: gdpr@uniroom.com',
          'Customer Support: +44 (0) 20 1234 5678 (Mon-Fri, 9am-5pm GMT)'
        ]
      },
      copyright: '© 2025 UniRoom Ltd. All rights reserved.'
    }
  };

  // 현재 선택된 언어에 따른 콘텐츠
  $: content = footerContent[language];
</script>

<footer class="bg-gray-900 text-white pt-16 pb-8">
  <div class="container mx-auto px-4">
    <!-- 언어 선택 -->
    <div class="flex justify-end mb-8">
      <select 
        bind:value={language}
        class="bg-gray-800 text-white px-3 py-1 rounded border border-gray-700"
      >
        <option value="ko">한국어</option>
        <option value="en-us">English (US)</option>
        <option value="en-uk">English (UK)</option>
      </select>
    </div>

    <!-- 회사 정보 및 카테고리 -->
    <div class="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
      <!-- 회사 정보 -->
      <div>
        <h3 class="text-lg font-bold mb-4">{content.companyInfo.title}</h3>
        <ul class="space-y-2">
          {#each content.companyInfo.content as item}
            <li class="text-gray-400 text-sm">
              <span class="text-gray-300">{item.name}:</span> {item.value}
            </li>
          {/each}
        </ul>
      </div>

      <!-- 카테고리 -->
      {#each content.categories as category}
        <div>
          <h3 class="text-lg font-bold mb-4">{category.title}</h3>
          <ul class="space-y-2">
            {#each category.links as link}
              <li>
                <a href={link.url} class="text-gray-400 hover:text-purple-400 transition duration-300">
                  {link.name}
                </a>
              </li>
            {/each}
          </ul>
        </div>
      {/each}
    </div>

    <!-- 법적 정보 -->
    <div class="border-t border-gray-800 pt-8 mb-8">
      <h3 class="text-lg font-bold mb-4">{content.legalInfo.title}</h3>
      <ul class="space-y-2">
        {#each content.legalInfo.content as item}
          <li class="text-gray-400 text-sm">{item}</li>
        {/each}
      </ul>
    </div>

    <!-- 저작권 -->
    <div class="text-center text-gray-500 text-sm">
      {content.copyright}
    </div>
  </div>
</footer>