package rgba.SkillShare.utils;

import javax.servlet.http.HttpSession;

import org.json.JSONObject;

public class SessionManager {
	
	public static boolean checkPermission(HttpSession sessao, String expectedType) {
		try {
			JSONObject user = (JSONObject) sessao.getAttribute("user");
			String userType = user.getString("type");
			
			if(userType.equals(expectedType)) {
				return true;
			}else {
				return false;
			}
			
		}catch (Exception e) {
			return false;
		}
		
	}
	
	public static boolean isLogged(HttpSession sessao) {
		try {
			JSONObject user = (JSONObject) sessao.getAttribute("user");
			String userType = user.getString("type");
			
			if(!userType.equals("guest")) {
				return true;
			}else {
				return false;
			}
			
		}catch (Exception e) {
			return false;
		}
	}
	
}
