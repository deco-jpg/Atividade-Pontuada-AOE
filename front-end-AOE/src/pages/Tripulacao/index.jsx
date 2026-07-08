import './style.css'
import { useEffect, useState } from 'react'
import api from '../../services/api'

export default function Tripulacao() {
	const [tripulacao, setTripulacao] = useState([])
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		const controller = new AbortController()

		async function load() {
			try {
				setLoading(true)
				setError(null)
				// usa o axios configurado em src/services/api.js
				const res = await api.get('/tripulacao', { signal: controller.signal })
				setTripulacao(res.data)
			} catch (err) {
				const isCanceled = err?.code === 'ERR_CANCELED' || err?.name === 'CanceledError' || err?.name === 'AbortError'
				if (!isCanceled) setError(err.message || 'Erro desconhecido')
			} finally {
				setLoading(false)
			}
		}

		load()
		return () => controller.abort()
	}, [])

	function formatDate(dateStr) {
		if (!dateStr) return '-'
		const d = new Date(dateStr)
		if (Number.isNaN(d.getTime())) return dateStr
		return d.toLocaleDateString('pt-BR')
	}

	// Agrupa por plataforma
	const agrupado = tripulacao.reduce((acc, item) => {
		const chave = item.plataforma || 'Sem plataforma'
		if (!acc[chave]) acc[chave] = []
		acc[chave].push(item)
		return acc
	}, {})

	if (loading) return <div className="trip-loading">Carregando escala...</div>
	if (error) return <div className="trip-error">Erro: {error}</div>

	return (
		<div className="tripulacao-container">
			<h1>Escala de Tripulação por Plataforma</h1>
			{Object.keys(agrupado).length === 0 && <p>Nenhum registro encontrado.</p>}

			{Object.keys(agrupado).map((plataforma) => (
				<section className="plataforma-section" key={plataforma}>
					<h2 className="plataforma-title">{plataforma}</h2>
					<ul className="trip-list">
						{agrupado[plataforma].map((p) => (
							<li className="trip-card" key={p.id}>
								<div className="trip-nome">{p.nomeFuncionario}</div>
								<div className="trip-funcao">{p.funcao}</div>
								<div className="trip-regime">Regime: {p.regime}</div>
								<div className="trip-periodo">{formatDate(p.dataInicio)} — {formatDate(p.dataFim)}</div>
							</li>
						))}
					</ul>
				</section>
			))}
		</div>
	)
}