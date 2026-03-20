

import jakarta.persistence.*

@Entity
@Table(name = "usuarios")
class Usuario(
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    val id: Long? = null,

    @Column(nullable = false, length= 100)
    val nome: String,

    @Column(nullable = false, unique = true, length= 100)
    val email: String,

    @Column(nullable = false)
    val senhaHash: String
)