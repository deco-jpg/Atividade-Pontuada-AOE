import './style.css'

export default function HSE() {
  return (
    <div className="hse-container">
      <h1>Saúde, Segurança e Meio Ambiente (HSE)</h1>
      
      <section className="hse-intro">
        <p>
          Na Atlantic Offshore Energy, a Saúde, Segurança e Meio Ambiente (HSE) são pilares fundamentais 
          de nossas operações. Nos comprometemos com o bem-estar de nossos colaboradores, com a proteção 
          ambiental e com a conformidade regulatória em todas as nossas atividades.
        </p>
      </section>

      <section className="hse-pillars">
        <h2>Nossos Pilares HSE</h2>
        <div className="pillars-grid">
          <div className="pillar-card">
            <h3>🛡️ Saúde Ocupacional</h3>
            <p>Garantir a saúde e bem-estar de todos os colaboradores através de programas preventivos, 
               monitoramento médico contínuo e promoção de estilos de vida saudáveis.</p>
          </div>
          
          <div className="pillar-card">
            <h3>⚠️ Segurança do Trabalho</h3>
            <p>Eliminar riscos e prevenir acidentes com práticas rigorosas, treinamentos constantes 
               e cultura de segurança em todas as operações.</p>
          </div>
          
          <div className="pillar-card">
            <h3>🌍 Proteção Ambiental</h3>
            <p>Minimizar o impacto ambiental de nossas operações, reduzindo emissões e resíduos, 
               protegendo ecossistemas marinhos e terrestres.</p>
          </div>
        </div>
      </section>

      <section className="hse-standards">
        <h2>Normas e Certificações</h2>
        <ul className="standards-list">
          <li><strong>ISO 45001:2018</strong> - Gestão de Segurança e Saúde Ocupacional</li>
          <li><strong>ISO 14001:2015</strong> - Gestão Ambiental</li>
          <li><strong>OHSAS 18001</strong> - Sistema de Gestão de Segurança e Saúde Ocupacional</li>
          <li><strong>IMCA</strong> - International Marine Contractors Association Standards</li>
        </ul>
      </section>

      <section className="hse-metrics">
        <h2>Indicadores de Desempenho</h2>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-value">245</div>
            <p>Dias sem Acidentes</p>
          </div>
          <div className="metric-card">
            <div className="metric-value">100%</div>
            <p>Conformidade Legal</p>
          </div>
          <div className="metric-card">
            <div className="metric-value">8,500+</div>
            <p>Horas de Treinamento HSE</p>
          </div>
          <div className="metric-card">
            <div className="metric-value">0</div>
            <p>Derramamento Ambiental</p>
          </div>
        </div>
      </section>
    </div>
  )
}
