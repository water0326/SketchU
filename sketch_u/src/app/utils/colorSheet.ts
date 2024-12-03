export const colors = {
  // 기본 색상
  white: '#FFFFFF',
  black: '#000000',
  
  // 상태 색상
  completed: {
    background: '#F6F9F3',
    shadow: 'rgba(0, 0, 0, 0.1)',
    hoverShadow: 'rgba(0, 0, 0, 0.15)',
    text: '#2F855A'
  },
  current: {
    background: '#FFFFFF',
    hover: '#F5F5F5',
    shadow: 'rgba(0, 0, 0, 0.15)',
    hoverShadow: 'rgba(0, 0, 0, 0.2)',
    text: '#000000'
  },
  upcoming: {
    background: '#F2F2F2',
    shadow: 'rgba(0, 0, 0, 0.08)',
    hoverShadow: 'rgba(0, 0, 0, 0.12)',
    text: '#718096'
  },

  // 상태 표시 배지
  badge: {
    completed: {
      background: '#F0FFF4',
      text: '#2F855A'
    },
    current: {
      background: '#EBF8FF',
      text: '#2B6CB0'
    },
    upcoming: {
      background: '#F7FAFC',
      text: '#718096'
    }
  },

  // 버튼
  button: {
    background: '#F6F9F3',
    hover: '#E2EBD9',
    text: '#3C3C3C',
    textHover: '#1A1A1A'
  },

  // 경계선
  border: '#E0E0E0',

  // 텍스트
  text: {
    primary: '#333333',
    secondary: '#666666',
    tertiary: '#444444',
    // 기간 표시 색상 추가
    remainDays: {
      danger: '#E53E3E',    // 1일 이하
      warning: '#D69E2E',   // 3일 이하
      normal: '#2C5282'     // 4일 이상
    }
  },

  // 특수 요소
  currentDateLine: '#FF4444',

  // 새로운 색상 추가
  tooltip: {
    shadow: 'rgba(0, 0, 0, 0.15)',
    arrow: '#FFFFFF'
  },

  // 로드맵 특화 색상
  roadmap: {
    primary: '#76c7c0',
    primaryHover: '#63aea6',
    secondary: '#E9E9E9',
    secondaryHover: '#d9d9d9',
    text: '#333',
    textSecondary: '#383838',
    divider: '#afafaf',
    inputBg: '#f6f9f3',
    inputShadow: 'rgba(0, 0, 0, 0.15)',
    timeline: {
      bg: '#E9E9E9',
      handle: '#76c7c0',
      handleHover: '#63aea6'
    },
    title: {
      text: '#333',
      hoverBg: '#f6f9f3',
      focusBg: '#f6f9f3'
    },
    input: {
      text: '#141414'
    },
    dateInput: {
      border: '#76c7c0',
      borderFocus: '#63aea6',
      text: '#383838',
      label: '#383838'
    },
    item: {
      container: '#F6F9F3',
      background: '#FFFFFF',
      editingBackground: '#F6F9F3',
      number: '#333333',
      name: '#333333',
      description: '#525252',
      date: '#666666',
      dateInput: {
        border: '#76c7c0',
        invalidBorder: '#ff6b6b',
        background: '#FFFFFF'
      }
    }
  },

  // 로딩 색상
  loading: {
    overlay: 'rgba(255, 255, 255, 0.8)',
    spinner: {
      border: '#f3f3f3',
      active: '#76c7c0'
    }
  },

  // 로드맵 페이지 색상
  roadmapPage: {
    background: {
      transparent: 'transparent',
      content: '#F2F2F2',
      modal: 'rgba(0, 0, 0, 0.25)'
    },
    text: {
      primary: '#000000',
      secondary: '#3C3C3C',
      tertiary: '#525252',
      quaternary: '#666666',
      light: '#141414'
    },
    button: {
      primary: '#90D8BF',
      primaryHover: '#7EC5AD',
      disabled: '#D9D9D9',
      delete: '#FF9494',
      deleteHover: '#FF7070'
    },
    divider: '#525252',
    scrollbar: {
      track: '#f1f1f1',
      thumb: '#90D8BF',
      thumbHover: '#7EC5AD'
    },
    session: {
      completed: '#F6F9F3',
      current: '#90D8BF',
      upcoming: '#F2F2F2',
      shadow: 'rgba(0, 0, 0, 0.25)',
      hoverShadow: 'rgba(0, 0, 0, 0.15)'
    },
    modal: {
      background: '#FFFFFF',
      shadow: 'rgba(0, 0, 0, 0.15)',
      button: {
        cancel: '#E9E9E9',
        cancelHover: '#d9d9d9',
        confirm: '#FF9494',
        confirmHover: '#FF7070'
      }
    },
    tooltip: {
      background: '#FFFFFF',
      error: '#FF9494',
      text: '#3C3C3C',
      textError: '#FFFFFF',
      shadow: 'rgba(0, 0, 0, 0.15)'
    },
    input: {
      background: '#FFFFFF',
      titleBackground: '#FFFFFF',
      editBackground: '#F2F2F2',
      border: 'none',
      padding: {
        title: '5px 10px',
        description: '10px',
        date: '2px 5px'
      },
      fontSize: {
        title: '33px',
        description: '26px',
        date: '16px'
      }
    },
    list: {
      controls: {
        background: '#F4F4F4',
        shadow: 'rgba(0, 0, 0, 0.15)',
        select: {
          hover: '#BDBDBD',
          focus: '#90CAF9',
          focusShadow: 'rgba(144, 202, 249, 0.4)',
          option: {
            background: '#FFFFFF',
            text: '#333333'
          }
        },
        checkbox: {
          background: '#F4F4F4',
          inner: '#FFFFFF'
        }
      },
      cardContainer: {
        scrollbar: {
          track: '#f1f1f1',
          thumb: '#888',
          thumbHover: '#555'
        }
      }
    }
  },

  roadmapCard: {
    background: '#F6F9F3',
    backgroundClear: '#E5E5E5',
    hoverBackground: '#F0F5EC',
    hoverBackgroundClear: '#DADADA',
    shadow: 'rgba(0, 0, 0, 0.1)',
    hoverShadow: 'rgba(0, 0, 0, 0.15)',
    progressBar: {
      active: '#90D8BF',
      inactive: '#e0e0e0'
    },
    text: {
      title: '#2B2B2B',
      subtitle: '#1C1C1C',
      category: '#000000',
      daysLeft: '#2792DF'
    }
  },

  auth: {
    input: {
      background: '#F6F9F3',
      border: '#E5E5E5',
      shadow: 'rgba(0, 0, 0, 0.15)',
      focusBorder: '#90D8BF',
      placeholder: '#999',
    },
    button: {
      primary: {
        background: '#90D8BF',
        hover: '#7AC1A8',
        text: '#000000',
      },
      secondary: {
        background: '#F6F9F3',
        hover: '#E2EBD9',
        text: '#666666',
      },
    },
    error: '#FF4444',
    title: '#333333',
  },

  navigation: {
    menuItem: {
      background: {
        selected: '#E8FFF7',
        default: '#e8fff700',
        hover: '#e8fff7aa'
      },
      text: {
        default: '#1A1A1A',
        hover: '#000000'
      }
    },
    background: '#90D8BF'
  },

  profile: {
    button: {
      background: '#f2f2f2',
      hover: '#e1e1e1',
      shadow: 'rgba(0, 0, 0, 0.2)'
    },
    dropdown: {
      background: '#ffffff',
      shadow: 'rgba(0, 0, 0, 0.15)',
      item: {
        background: 'transparent',
        hover: '#f0f0f0',
        active: '#e5e5e5',
        text: '#333',
        textHover: '#000'
      },
      welcomeText: '#333'
    }
  }
}
