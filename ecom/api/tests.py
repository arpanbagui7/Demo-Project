from django.test import SimpleTestCase

# Create your tests here.
class SimpleTests(SimpleTestCase):
    def test_urlTestForApi(self):
        response = self.client.get('/api/')
        self.assertEqual(response.status_code, 200)
    
    '''def urlTestForProduct(self):
        response = self.client.get('/product/')
        print(response)'''