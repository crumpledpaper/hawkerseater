import os
import urllib
import random

import jinja2
import webapp2

from google.appengine.api import channel
from google.appengine.api import memcache

JINJA_ENVIRONMENT = jinja2.Environment(
    loader=jinja2.FileSystemLoader(os.path.join(os.path.dirname(__file__),'templates')),
    extensions=['jinja2.ext.autoescape'],
    autoescape=True)

class BaseHandler(webapp2.RequestHandler):
    @webapp2.cached_property
    def jinja2(self):
        return jinja2.get_jinja2(app=self.app)

    def render_template(
        self,
        filename,
        template_values,
        **template_args
        ):
        template = JINJA_ENVIRONMENT.get_template(filename)
        self.response.out.write(template.render(template_values))

class MainHandler(BaseHandler):
    def get(self):
        places = ['Old Airport Road Food Centre',
                  'Tekka Centre',
                  'China Square Food Centre',
                  'Maxwell Road Hawker Centre',
                  'Zion Riverside Food Centre',
                  'Adam Food Centre',
                  'Bedok South 16 Hawker Centre',
                  'Bedok Food Centre',
                  'The Centrepoint',
                  'Juz Food Court',
                  '67 Killiney Kopitiam',
                  '3 Rochor Road Kopitiam'
                  ]
        tables = {'table_' + str(i) : memcache.get('table_' + str(i)) for i in range(8)}
        tables['places'] = places
        tables['img'] = memcache.get('img')
        self.render_template('index.html',tables)
    
class Table(BaseHandler):
    def post(self):
        #get data from raspberry pi
        memcache.set(key = 'img', value = self.request.get('file'))
        memcache.set_multi({str(i):self.request.get(str(i)) for i in range(8)},key_prefix='table_', time=600)

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/table', Table)
], debug=True)
