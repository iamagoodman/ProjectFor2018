from PIL import Image
import sys 
import os
import _io
from collections import namedtuple

class Nude:
    Skin = namedtuple('Skin','id skin region x y')    

    def __init__(self, path_or_image):

        if isinstance(path_or_image, Image.Image):
            self.image = path_or_image
        
        elif isinstance(path_or_image, str):
            self.image = Image.open(path_or_image)
        
        bands = self.image.getbands()

        if len(bands) == 1:
            new_img = Image.new('RGB', self.image.size)
            new_img.paste(self.image)
            f = self.image.filename
            self.image = new_img
            self.image.filename = f
        
        self.skin_map = []
        self.detected_regions = []
        self.merge_regions = []
        self.skin_regions = []

        self.last_from, self.last_to = -1,-1
        self.result = None
        self.message = None
        
        self.width, self.height = self.image.size

        self.total_pixels = self.width * self.height

    def resize(self, maxwidth=1000,maxheight=1000):
        ret = 0
        if maxwidth:
            if self.width > maxwidth:
                wpercent = (maxwidth/self.width)
                hsize = int((self.height*wpercent))
                fname = self.image.filename

                self.image = self.image.resize((maxwidth, hsize), Image.LANCZOS)
                self.image.filename = fname
                self.width, self.height = self.image.size
                self.total_pixels = self.width * self.height

                ret += 1
        
        if maxheight:
            if self.height>maxheight:
                hpercent = (maxheight/float(self.height))
                wsize = int((float(self.width)*float(hpercent)))
                fname = self.image.filename
                self.image = self.image.resize((wsize, maxheight),Image.LANCZOS)
                self.image.filename = fname
                self.width, self.height = self.image.size
                self.total_pixels = self.width * self.height
                ret += 2
        return ret

    def parse(self):
        if self.result is not None:
            return self
        pixels = self.image.load()

        for y in range(self.height):
            for x in range(self.width):
                r = pixels[x,y][0]
                g = pixels[x,y][1]
                b = pixels[x,y][2]

                isSkin = True if self._classify_skin(r,g,b) else False
                _id = x + y * self.width + 1
                self.skin_map.append(self.Skin(_id,isSkin, None, x, y))
                if not isSkin:
                    continue

                check_indexes = [_id-2, self.width-2, self.width-1, self.width]
                region = -1

                for index in check_indexes:
                    try:
                        self.skin_map[index]
                    except IndexError:
                        break
                    if self.skin_map[index].skin:
                        if (self.skin_map[index].region!=None and region!=None and region!=-1 and self.skin_map[index].region!=region and self.last_from!=region and self.last_to!=self.skin_map[index].region):
                            self._add_merge(region, self.skin_map[index].region)
                            region = self.skin_map[index].region
                            
                            if region == -1:
                                _skin = self.skin_map[_id-1]._replace(region=len(self.detected_regions))
                                self.skin_map[_id-1] = _skin
                                self.detected_regions.append([self.skin_map[_id-1]])
                            elif region!=None:
                                _skin = self.skin_map[_id-1]._replace(region=region)
                                self.skin_map[_id-1] = _skin
                                self.detected_regions[region].append(self.skin_map[_id-1])

                                self._merge(self.detected_regions,self.merge_regions)
                                self._analyse_regions()
                                return self