from docx import Document

doc = Document('title.docx')

print(doc.paragraphs)
print(doc.tables)
for paragraph in doc.paragraphs:
		print(paragraph.text)
# 	print(paragraph.paragraph_format.left_indent)
		runs = paragraph.runs
		for run in runs:
				print(len(run.text))
# 				print(run.font.color.rgb)
# 				print(run.font.highlight_color)

