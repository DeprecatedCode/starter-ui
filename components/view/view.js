/**
 * Dependency paths
 */
var lib = window.lib,
    cmp = window.cmp;

/**
 * View
 */
define([lib('underscore'), cmp('base')], function (_, BaseComponent) {

  /**
   * Create the View subclass of BaseComponent
   */
  return _.class(BaseComponent, function (proto) {
    
    /**
     * Column class names
     */
    proto.colNames = ('zero one two three four five six seven eight nine ten ' +
                      'eleven twelve thirteen fourteen fifteen sixteen ' +
                      'seventeen eighteen nineteen twenty').split(' ');

    /**
     * Initialize View component
     */
    proto.init = function initViewComponent(el) {
      
      if (this.depth > 0) {
        el.addClass('columns');
        el.addClass(proto.colNames[this.spec.width || 0]);
      }
      
      /**
       * Main content area
       */
      if (this.depth === 0) {
        this.content = el.append('.row');
      }
      
      else {
        this.content = el;
      }

      if(this.spec.title) {
        if (document.title === '') {
          document.title = this.spec.title;
        }
        this.content.append('h' + _.min([6, this.depth + 1]), {'html': this.spec.title});
      }

      if(this.spec.description) {
        this.content.append('p', {'html': this.spec.description});
      }
      
      if (this.spec['+'] && this.spec['+'].length &&
          this.spec['+'][0] && this.spec['+'][0].width) {
        
        var total = _.reduce(this.spec['+'], function(memo, child) {
          return memo + child.width || 0;
        }, 0);
        
        total = _.min([20, total]);
        
        this.womb = el.append({'className': 'row colgrid ' + proto.colNames[total]});
      }

    };

  });

});
