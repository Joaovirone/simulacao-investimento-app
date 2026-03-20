

import jakarta.persistence.*
import java.math.*
import java.time.*
@Entity
@Table(name = "simulacoes")
class Simulacao(

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "usuario_id", nullable = false)
    val usuario: Usuario,

    @Column(name = "tipo_investimento", nullable = false)
    var tipoInvestimento: String,

    @Column(name = "valor_inicial", nullable = false, precision = 19, scale = 2)
    var valorInicial: BigDecimal,

    @Column(name = "aporte_mensal", nullable = false, precision = 19, scale = 2)
    var aporteMensal: BigDecimal,

    @Column(name = "taxa_aplicada", nullable = false, precision = 5, scale = 4)
    var taxaAplicada: BigDecimal, 

    @Column(name = "prazo_meses", nullable = false)
    var prazoMeses: Int,

    @Column(name = "resultado_final", nullable = false, precision = 19, scale = 2)
    var resultadoFinal: BigDecimal,

    @Column(name = "data_simulacao", nullable = false)
    val dataSimulacao: LocalDateTime = LocalDateTime.now()


)