import os
import docx

from docx.document import Document
from docx.oxml.table import CT_Tbl
from docx.oxml.shape import (CT_Blip,CT_BlipFillProperties,CT_GraphicalObject,CT_GraphicalObjectData,CT_Inline,
                                CT_NonVisualDrawingProps,
                                CT_Picture,
                                CT_PictureNonVisual,
                                CT_Point2D,
                                CT_PositiveSize2D,
                                CT_ShapeProperties,
                                CT_Transform2D,)
from docx.oxml.text.paragraph import CT_P
from docx.shared import Pt, RGBColor
from docx.table import _Cell, Table
from docx.text.paragraph import Paragraph
from docx.shape import InlineShapes
# 按顺序打印段落和table
def iter_block_items(parent):
    """
    Yield each paragraph and table child within *parent*, in document order.
    Each returned value is an instance of either Table or Paragraph. *parent*
    would most commonly be a reference to a main Document object, but
    also works for a _Cell object, which itself can contain paragraphs and tables.
    """
    if isinstance(parent, Document):
        parent_elm = parent.element.body
        print(29,parent_elm.items())
    elif isinstance(parent, _Cell):
        parent_elm = parent._tc
        print(32,parent_elm)
    else:
        raise ValueError("something's not right")


    for child in parent_elm.iterchildren():
        if isinstance(child, CT_P):
            yield Paragraph(child, parent)
        elif isinstance(child, CT_Tbl):
            yield Table(child, parent)
        elif isinstance(child, CT_Inline):
            yield InlineShapes(child, parent)


def read_table(table):
    return [[cell.text for cell in row.cells] for row in table.rows]


def read_word(word_path):
    doc = docx.Document(word_path)
    for block in iter_block_items(doc):
        if isinstance(block, Paragraph):
            print("text", [block.text])
            for run in block.runs:
#                 run.font.color.rgb = RGBColor(255, 255, 0)
	              print("run",run.text)
	              print("run",run.style.font.color.rgb)
        elif isinstance(block, Table):
            print("table", read_table(block))
        elif isinstance(block, InlineShapes):
            print("picture", InlineShapes)


def read_shape():
		Document = docx.Document('title.docx')
		shapes = Document.inline_shapes
		print(len(shapes))
		for shape in shapes:
			print(shape.height.inches)
			print(shape._inline.graphic.graphicData.uri)

# read_shape()

if __name__ == '__main__':
    ROOT_DIR_P = os.path.abspath(os.path.dirname(os.path.dirname(__file__)))  # 项目根目录
#     word_path = os.path.join(ROOT_DIR_P, "data/test_to_word.docx")  # pdf文件路径及文件名
    word_path = "title1.docx"  # pdf文件路径及文件名
    # word_path = os.path.join(ROOT_DIR_P, "data/test_to_word2.docx")  # pdf文件路径及文件名
    read_word(word_path)
