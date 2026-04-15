import  Aura  from '@primeuix/themes/aura';
import  {definePreset}  from '@primeuix/themes';
const MyPreset = definePreset(Aura, {
  semantic: {
    colorScheme: {
      light: {
        primary: {
          50: '#E0F2FF',
          100: '#B3E5FF',
          200: '#80D4FF',
          300: '#4DC3FF',
          400: '#26B7FF',
          500: '#0099E6', // اللون الأساسي Light
          600: '#0073B3',
          700: '#005080',
          800: '#00334D',
          900: '#001F26'
        }
        
      },
      dark: {
        primary: {
          50: '#D0E8FF',
          100: '#A0D1FF',
          200: '#70B9FF',
          300: '#40A2FF',
          400: '#1C8CFF',
          500: '#0077E6', // ممكن تستخدم لون رئيسي ثانوي هنا لو حبيت
          600: '#005FA3',
          700: '#004970',
          800: '#002F4D',
          900: '#001922'
        },
        highlight: {
          background: '#26B7FF', // لون أفتح للبعض العناصر في Dark Mode
          color: '#ffffff'        // النص يكون أبيض لتباين أفضل
        }
      }
    }
  }
});


export default MyPreset;
