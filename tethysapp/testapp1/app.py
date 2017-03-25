from tethys_sdk.base import TethysAppBase, url_map_maker


class Testapp1(TethysAppBase):
    """
    Tethys app class for Testapp1.
    """

    name = 'Testapp1'
    index = 'testapp1:home'
    icon = 'testapp1/images/icon.gif'
    package = 'testapp1'
    root_url = 'testapp1'
    color = '#3498db'
    description = 'Place a brief description of your app here.'
    enable_feedback = False
    feedback_emails = []

        
    def url_maps(self):
        """
        Add controllers
        """
        UrlMap = url_map_maker(self.root_url)

        url_maps = (UrlMap(name='home',
                           url='testapp1',
                           controller='testapp1.controllers.home'),
        )

        return url_maps