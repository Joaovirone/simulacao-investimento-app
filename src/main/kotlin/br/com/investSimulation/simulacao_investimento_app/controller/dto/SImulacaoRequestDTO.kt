

import java.math.BigDecimal

data class SimulacaoRequest(
    val usuarioId: Long,
    val tipoInvestimento: String,
    val valorInicial: BigDecimal,
    val aporteMensal: BigDecimal,
    val taxaAnual: BigDecimal,
    val prazoMeses: Int
)