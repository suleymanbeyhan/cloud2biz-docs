import AskAI from '@site/src/components/AskAI';
import BackToTop from '@site/src/components/BackToTop';

// Tüm sayfalarda sağ altta "Yapay Zekâya Sor" penceresi.
export default function Root({children}) {
  return (
    <>
      {children}
      <BackToTop />
      <AskAI />
    </>
  );
}
