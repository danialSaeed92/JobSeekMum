package mum.cs472.magd.taghandler;

import java.util.Calendar;
import javax.servlet.jsp.JspException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;

public class TagHandler extends TagSupport {

	private static final long serialVersionUID = 1L;

	public int doStartTag() throws JspException {
		JspWriter out = pageContext.getOut();
		try {
			out.print(Calendar.getInstance().getTime());
		} catch (Exception e) {
			System.out.println(e); //<%@ taglib uri="mytags.tld" prefix="m" %>
		}
		return SKIP_BODY;
	}
}