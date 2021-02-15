package rgba.model;

import javax.persistence.EntityManager;

public class CrudBasico {
	
	public void salvarBanco (Object entidade) {
		EntityManager con = new ConnectionFactory().getConnection();
		
		try {
			con.getTransaction().begin();
			con.persist(entidade);
			con.getTransaction().commit();
		}
		catch (Exception exception) {
			exception.printStackTrace();
			con.getTransaction().rollback();
		}
		finally {
			con.close();
		}
	}

}
