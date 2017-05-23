from setuptools import setup, find_packages
#this is a test
setup(name = 'form-kit',
      description = 'All my favorite form enhancements in one place',
      version = '1.4',
      url = 'https://github.com/ninapavlich/django-share-me-share-me',
      author = 'Nina Pavlich',
      author_email='nina@ninalp.com',
      license = 'BSD',
      packages=find_packages(exclude=['ez_setup']),
      zip_safe = False,
      include_package_data=True,
      install_requires = [],
      classifiers=[
       'Development Status :: 4 - Beta',
       'Environment :: Web Environment',
       'Intended Audience :: Developers',
       'License :: OSI Approved',
       'Operating System :: OS Independent'
      ]
)
