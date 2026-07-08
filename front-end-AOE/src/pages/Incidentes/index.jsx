import { useState } from 'react'
import './style.css'
import { api } from '../../services/api'

export default function Incidentes() {
  const [formData, setFormData] = useState({
    gravidade: '',
    data: '',
    hora: '',
    plataforma: '',
    descricao: '',
    acoesImediatas: ''
  })

  const [enviando, setEnviando] = useState(false)
  const [mensagem, setMensagem] = useState({ tipo: '', texto: '' })

  const niveisGravidade = [
    { valor: 'critica', label: 'Crítica - Risco imediato à segurança' },
    { valor: 'alta', label: 'Alta - Risco significativo' },
    { valor: 'media', label: 'Média - Risco moderado' },
    { valor: 'baixa', label: 'Baixa - Risco mínimo' }
  ]

  const plataformas = [
    'AOE-01 - Plataforma de produção principal',
    'AOE-05 - Unidade de suporte logístico',
    'AOE-12 - Plataforma de manutenção',
    'AOE-18 - Centro de operações e segurança'
  ]

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validação básica
    if (!formData.gravidade || !formData.data || !formData.hora || !formData.plataforma || !formData.descricao || !formData.acoesImediatas) {
      setMensagem({
        tipo: 'erro',
        texto: 'Por favor, preencha todos os campos obrigatórios.'
      })
      return
    }

    setEnviando(true)
    setMensagem({ tipo: '', texto: '' })

    try {
      const response = await api.post('/incidentes', {
        gravidade: formData.gravidade,
        data: formData.data,
        hora: formData.hora,
        plataforma: formData.plataforma,
        descricao: formData.descricao,
        acoesImediatas: formData.acoesImediatas,
        dataRegistro: new Date().toISOString()
      })

      if (response.status === 201 || response.status === 200) {
        setMensagem({
          tipo: 'sucesso',
          texto: 'Incidente registrado com sucesso! ID: ' + (response.data.id || '')
        })
        setFormData({
          gravidade: '',
          data: '',
          hora: '',
          plataforma: '',
          descricao: '',
          acoesImediatas: ''
        })
        setTimeout(() => {
          setMensagem({ tipo: '', texto: '' })
        }, 5000)
      }
    } catch (error) {
      console.error('Erro ao registrar incidente:', error)
      setMensagem({
        tipo: 'erro',
        texto: 'Erro ao registrar incidente. Tente novamente.'
      })
    } finally {
      setEnviando(false)
    }
  }

  return (
    <div className="incidentes-container">
      <header className="incidentes-header">
        <h1>Registro de Incidentes Operacionais</h1>
        <p className="categoria">Formulário Crítico para Reporte de Anomalias ou Acidentes</p>
      </header>

      <main className="incidentes-main">
        <section className="formulario-section">
          <div className="alerta-critico">
            <strong>⚠️ Atenção:</strong> Este formulário é crítico para a segurança operacional. Todos os campos devem ser preenchidos com informações precisas e detalhadas.
          </div>

          {mensagem.texto && (
            <div className={`mensagem mensagem-${mensagem.tipo}`}>
              {mensagem.texto}
            </div>
          )}

          <form onSubmit={handleSubmit} className="incidentes-form">
            <div className="form-row">
              <div className="form-group">
                <label htmlFor="gravidade">
                  Nível de Gravidade <span className="obrigatorio">*</span>
                </label>
                <select
                  id="gravidade"
                  name="gravidade"
                  value={formData.gravidade}
                  onChange={handleChange}
                  className={`gravidade-${formData.gravidade}`}
                  required
                >
                  <option value="">Selecione o nível de gravidade...</option>
                  {niveisGravidade.map(nivel => (
                    <option key={nivel.valor} value={nivel.valor}>
                      {nivel.label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="plataforma">
                  Plataforma Afetada <span className="obrigatorio">*</span>
                </label>
                <select
                  id="plataforma"
                  name="plataforma"
                  value={formData.plataforma}
                  onChange={handleChange}
                  required
                >
                  <option value="">Selecione a plataforma...</option>
                  {plataformas.map(plataforma => (
                    <option key={plataforma} value={plataforma}>
                      {plataforma}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="data">
                  Data do Incidente <span className="obrigatorio">*</span>
                </label>
                <input
                  type="date"
                  id="data"
                  name="data"
                  value={formData.data}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="hora">
                  Hora do Incidente <span className="obrigatorio">*</span>
                </label>
                <input
                  type="time"
                  id="hora"
                  name="hora"
                  value={formData.hora}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="descricao">
                Descrição Detalhada do Incidente <span className="obrigatorio">*</span>
              </label>
              <textarea
                id="descricao"
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Descreva o incidente de forma clara e detalhada. Inclua o que aconteceu, onde, como e por que."
                rows="6"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="acoesImediatas">
                Ações Imediatas Tomadas <span className="obrigatorio">*</span>
              </label>
              <textarea
                id="acoesImediatas"
                name="acoesImediatas"
                value={formData.acoesImediatas}
                onChange={handleChange}
                placeholder="Descreva as ações imediatas que foram tomadas para conter o incidente ou minimizar danos."
                rows="6"
                required
              />
            </div>

            <div className="form-actions">
              <button type="submit" className="btn-submit" disabled={enviando}>
                {enviando ? 'Registrando...' : 'Registrar Incidente'}
              </button>
              <button
                type="reset"
                className="btn-reset"
                onClick={() => {
                  setFormData({
                    gravidade: '',
                    data: '',
                    hora: '',
                    plataforma: '',
                    descricao: '',
                    acoesImediatas: ''
                  })
                  setMensagem({ tipo: '', texto: '' })
                }}
              >
                Limpar Formulário
              </button>
            </div>
          </form>
        </section>

        <section className="informacoes-section">
          <h2>Instruções de Preenchimento</h2>
          <div className="instrucoes-grid">
            <div className="instrucao-card">
              <h3>Gravidade</h3>
              <p>Selecione o nível de gravidade do incidente conforme o impacto potencial à segurança e operações.</p>
            </div>
            <div className="instrucao-card">
              <h3>Data e Hora</h3>
              <p>Registre a data e hora exatas em que o incidente ocorreu para melhor rastreabilidade.</p>
            </div>
            <div className="instrucao-card">
              <h3>Plataforma</h3>
              <p>Identifique precisamente qual plataforma foi afetada pelo incidente operacional.</p>
            </div>
            <div className="instrucao-card">
              <h3>Descrição</h3>
              <p>Forneça detalhes completos sobre o incidente, incluindo contexto e circunstâncias.</p>
            </div>
            <div className="instrucao-card">
              <h3>Ações Imediatas</h3>
              <p>Liste todas as ações preventivas ou corretivas já implementadas para conter a situação.</p>
            </div>
            <div className="instrucao-card">
              <h3>Conformidade</h3>
              <p>Garanta que todas as informações sejam precisas para cumprimento regulatório.</p>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
