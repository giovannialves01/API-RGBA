package rgba.model;

import java.util.List;

import javax.persistence.EntityManager;

import org.hibernate.query.Query;


/**
 * Classe responsável por realizar as ações que interagem com o banco de dados
 * 
 * @author Rafael Furtado
 * @
 */
public class DBAdmin {
	
	private EntityManager con;
	
	
	
	/**
	 * Salva uma dada entidade no banco de dados
	 * 
	 * @author Rafael Furtado
	 * @param entidade - Objeto que será salvo no banco de dados
	 * @return void
	 */
	public void salvarEntidade (Object entidade) {
		abrirConexao();
		
		try {
			con.getTransaction().begin();
			con.persist(entidade);
			con.getTransaction().commit();
			
		}catch (Exception exception) {
			exception.printStackTrace();
			con.getTransaction().rollback();
			
		}finally {
			con.close();
			
		}
		
	}
	
	
	/**
	 * Atualiza as informações de uma entidade já existente no banco de dados
	 * 
	 * @author Rafael Furtado
	 * @param entidade - Objeto que será atualizado no banco de dados
	 * @return void
	 */
	public void atualizarEntidade(Object entidade) {
		abrirConexao();
		
		try {
			con.getTransaction().begin();
			con.merge(entidade);
			con.getTransaction().commit();
			
		}catch (Exception exception) {
			con.getTransaction().rollback();
			exception.printStackTrace();
			
		}finally {
			con.close();
			
		}
		
	}
	
	/**
	 * Remove uma entidade no banco de dados
	 * 
	 * @author Rafael Furtado
	 * @param entidade - Objeto se deseja remover
	 * @return void
	 */
	public void removerEntidade(Object entidade) {
		abrirConexao();
		
		try {
			con.getTransaction().begin();
			con.remove(entidade);
			con.getTransaction().commit();
		}
		catch (Exception exception) {
			con.getTransaction().rollback();
			exception.printStackTrace();
			
		}
		finally {
			con.close();
			
		}

	}
	
	
	/**
	 * Encontra uma entida no banco de dados cujo a classe e chave primária estejam de acordo
	 * 
	 * @author Rafael Furtado
	 * @param classeEntidade - Objeto da classe da entidade que se deseja buscar
	 * @param chavePrimaria - Chave primária do objeto que se deseja buscar
	 * @return entidade - Entidade encontrada no banco de dados
	 */
	public Object encontrarEntidade(Object classeEntidade, Object chavePrimaria) {
		abrirConexao();
		
		Object entidade = con.find(classeEntidade.getClass(), chavePrimaria);

		con.close();
		
		return entidade;
	}
	
	
	/**
	 * Retorna uma List com todas as entidades na tabela da classe da entidade passada como parâmetro
	 * 
	 * @author Rafael Furtado
	 * @param entidade - Classe das entidades que se deseja encontrar todas
	 * @return List - Uma List com todas as entidades encontradas na tabela da classe da entidade fornecida 
	 */
	public List<Object> encontrarTodasEntidades(Object entidade) {
		abrirConexao();
		
		String classeEntidade = entidade.getClass().getName();
		
		String sql = "select * from " + classeEntidade;
		
		@SuppressWarnings("unchecked")
		List<Object> query = con.createQuery(sql).getResultList();
		
		return query;
	}
	
	
	/**
	 * Abre a conexão com o banco de dados
	 * 
	 * @author Rafael Furtado
	 */
	private void abrirConexao() {
		if(!con.isOpen()) {
			con = new ConnectionFactory().getConnection();
			
		}
		
	}

}
