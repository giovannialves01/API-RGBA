package rgba.SkillShare.converters;

import javax.persistence.AttributeConverter;
import javax.persistence.Converter;

import org.json.JSONObject;

@Converter
public class JSONObjectConverter implements AttributeConverter<JSONObject, String> {

	@Override
	public String convertToDatabaseColumn(JSONObject attribute) {
		return attribute.toString();
	}

	@Override
	public JSONObject convertToEntityAttribute(String dbData) {
		return new JSONObject(dbData);
	}

}
