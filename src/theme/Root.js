import AskAI from '@site/src/components/AskAI';

// Tüm sayfalarda sağ altta "Yapay Zekâya Sor" penceresi.
export default function Root({children}) {
  return (
    <>
      {children}
      <AskAI />
    </>
  );
}
