import { useState } from 'react'
import './style.css'
import api from '../../services/api'

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

  const [mensagem, setMensagem] = useState({
    tipo: '',
    texto: ''
  })


  const niveisGravidade = [
    {
      valor: 'critica',
      label: 'Crítica - Risco imediato à segurança'
    },
    {
      valor: 'alta',
      label: 'Alta - Risco significativo'
    },
    {
      valor: 'media',
      label: 'Média - Risco moderado'
    },
    {
      valor: 'baixa',
      label: 'Baixa - Risco mínimo'
    }
  ]


  const handleChange = (e) => {

    const { name, value } = e.target

    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }



  const limparFormulario = () => {

    setFormData({
      gravidade: '',
      data: '',
      hora: '',
      plataforma: '',
      descricao: '',
      acoesImediatas: ''
    })

  }



  const handleSubmit = async (e) => {

    e.preventDefault()


    if (
      !formData.gravidade ||
      !formData.data ||
      !formData.hora ||
      !formData.plataforma ||
      !formData.descricao ||
      !formData.acoesImediatas
    ) {

      setMensagem({
        tipo: 'erro',
        texto: 'Preencha todos os campos obrigatórios.'
      })

      return
    }


    setEnviando(true)

    setMensagem({
      tipo: '',
      texto: ''
    })


    try {


      const response = await api.post('/api/incidentes', {

        gravidade: formData.gravidade,

        data: formData.data,

        hora: formData.hora,

        plataforma: formData.plataforma,

        descricao: formData.descricao,

        acoesImediatas: formData.acoesImediatas

      })



      if(response.status === 200 || response.status === 201){

        setMensagem({
          tipo:'sucesso',
          texto:
          `Incidente registrado com sucesso! ID: ${response.data.id ?? ''}`
        })


        limparFormulario()

      }



    } catch(error){

      console.error(error)


      setMensagem({
        tipo:'erro',
        texto:'Erro ao registrar incidente.'
      })

    } finally {

      setEnviando(false)

    }

  }



  return (

    <div className="incidentes-container">


      <header className="incidentes-header">

        <h1>
          Registro de Incidentes Operacionais
        </h1>

        <p className="categoria">
          Formulário Crítico para Reporte de Anomalias ou Acidentes
        </p>

      </header>



      <main className="incidentes-main">


        <section className="formulario-section">


          <div className="alerta-critico">

            <strong>⚠️ Atenção:</strong>

            Este formulário é crítico para a segurança operacional.
            Todos os campos devem ser preenchidos.

          </div>



          {
            mensagem.texto && (

              <div className={`mensagem mensagem-${mensagem.tipo}`}>

                {mensagem.texto}

              </div>

            )
          }




          <form 
            className="incidentes-form"
            onSubmit={handleSubmit}
          >



            <div className="form-row">



              <div className="form-group">

                <label>
                  Nível de Gravidade *
                </label>


                <select

                  name="gravidade"

                  value={formData.gravidade}

                  onChange={handleChange}

                  className={`gravidade-${formData.gravidade}`}

                  required

                >

                  <option value="">
                    Selecione a gravidade
                  </option>


                  {
                    niveisGravidade.map(item => (

                      <option 
                        key={item.valor}
                        value={item.valor}
                      >

                        {item.label}

                      </option>

                    ))
                  }


                </select>


              </div>




              <div className="form-group">


                <label>
                  Plataforma Afetada *
                </label>


                <input

                  type="text"

                  name="plataforma"

                  placeholder="Digite a plataforma"

                  value={formData.plataforma}

                  onChange={handleChange}

                  required

                />


              </div>



            </div>





            <div className="form-row">



              <div className="form-group">

                <label>
                  Data do Incidente *
                </label>


                <input

                  type="date"

                  name="data"

                  value={formData.data}

                  onChange={handleChange}

                  required

                />


              </div>





              <div className="form-group">


                <label>
                  Hora do Incidente *
                </label>


                <input

                  type="time"

                  name="hora"

                  value={formData.hora}

                  onChange={handleChange}

                  required

                />


              </div>



            </div>





            <div className="form-group">


              <label>
                Descrição Detalhada *
              </label>


              <textarea

                name="descricao"

                placeholder="Descreva o incidente..."

                value={formData.descricao}

                onChange={handleChange}

                rows="6"

                required

              />

            </div>





            <div className="form-group">


              <label>
                Ações Imediatas Tomadas *
              </label>


              <textarea

                name="acoesImediatas"

                placeholder="Informe as ações realizadas..."

                value={formData.acoesImediatas}

                onChange={handleChange}

                rows="6"

                required

              />


            </div>






            <div className="form-actions">


              <button

                type="submit"

                className="btn-submit"

                disabled={enviando}

              >

                {
                  enviando
                  ? 'Registrando...'
                  : 'Registrar Incidente'
                }


              </button>




              <button

                type="button"

                className="btn-reset"

                onClick={() => {

                  limparFormulario()

                  setMensagem({
                    tipo:'',
                    texto:''
                  })

                }}

              >

                Limpar Formulário

              </button>



            </div>




          </form>



        </section>





        <section className="informacoes-section">


          <h2>
            Instruções de Preenchimento
          </h2>



          <div className="instrucoes-grid">


            <div className="instrucao-card">

              <h3>
                Gravidade
              </h3>

              <p>
                Escolha o nível de impacto do incidente.
              </p>

            </div>



            <div className="instrucao-card">

              <h3>
                Plataforma
              </h3>

              <p>
                Informe a plataforma afetada.
              </p>

            </div>




            <div className="instrucao-card">

              <h3>
                Descrição
              </h3>

              <p>
                Explique detalhadamente o ocorrido.
              </p>

            </div>




            <div className="instrucao-card">

              <h3>
                Ações Imediatas
              </h3>

              <p>
                Informe as medidas tomadas.
              </p>

            </div>



          </div>



        </section>



      </main>


    </div>

  )

}