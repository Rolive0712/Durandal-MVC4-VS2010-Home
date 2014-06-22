using AttributeRouting.Web.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Http;
using DapperORMDataAccess;

namespace DurandalSPAMVC4.Controllers
{
    public class NorthwindController : Controller
    {
        private readonly INorthWindRepository iNorthRep = new NorthwindRepository();

        [GET("/App/Views/{viewname}.html")]
        public ActionResult Index(string viewname)
        {
            string demo = "Here could be your advertisement!";
            return View("~/Views/Durandal/" + viewname + ".cshtml", model: demo);
        }

        //[GET("/App/Views/{viewname}.html")]
        public JsonResult GetOrders(string viewname, int orderid)
        {
            try
            {
                return Json(iNorthRep.GetOrders(), JsonRequestBehavior.AllowGet);
            }
            catch (Exception ex)
            {
                return Json(ex.Message);
            }
        }

        public ActionResult Create()
        {
            return View();
        }

        public ActionResult Create(FormCollection collection)
        {
            try
            {
                // TODO: Add insert logic here

                return RedirectToAction("Index");
            }
            catch
            {
                return View();
            }
        }

    }
}
