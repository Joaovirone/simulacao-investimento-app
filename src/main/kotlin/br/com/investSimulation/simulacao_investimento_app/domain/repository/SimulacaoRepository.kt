

import org.springframework.data.jpa.repository.JpaRepository
import org.springframework.stereotype.Repository

@Repository
interface SimulacaoRepository : JpaRepository<Simulacao, Long> {

    fun findAllByUsuarioId(usuarioId: Long): List<Simulacao>
}