import os
import urllib
import random

import jinja2
import webapp2

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
                  'Bedok Food Centre'
                  ]
        self.render_template('index.html',{
            'places' : places
            })
    
class Table(BaseHandler):
    def get(self):
        place = self.request.get('place')
        tables = self.request.get('tables')
        #tables = [random.choice([True,False]) for i in range(10)]
        self.render_template('tables.html',{
            'tables' : tables,
            'place' : place
            })

    def post(self):
        #get data from raspberry pi
        place = self.request.get('place')
        tables = self.request.get('form')
        self.redirect('/table?' + urllib.urlencode({'tables' : tables,
                                                    'place' : place}))

class Maps(BaseHandler):
    def get(self):
        self.render_template('maps.html',{})

app = webapp2.WSGIApplication([
    ('/', MainHandler),
    ('/maps', Maps),
    ('/table', Table)
], debug=True)
